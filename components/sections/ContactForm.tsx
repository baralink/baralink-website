'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowUpRight, Check, ChevronDown, Loader2 } from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nProvider';
import {
  API_URL,
  CONTACT_TOPICS,
  CONTACT_TOPIC_EVENT,
  type ContactTopic,
} from '@/lib/contact';
import { track } from '@/lib/analytics';

type Field = 'topic' | 'name' | 'email' | 'phone' | 'message';
type Errors = Partial<Record<Field, string>>;
type SubmitState = 'idle' | 'sending' | 'sent';

const PHONE = /^\+?[0-9 ().-]{8,30}$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FIELD_ORDER: Field[] = [
  'topic',
  'name',
  'email',
  'phone',
  'message',
];

function digits(value: string) {
  return value.replace(/\D/g, '').length;
}

function focusFirstError(errors: Errors) {
  const first = FIELD_ORDER.find((field) => errors[field]);

  if (first) {
    window.requestAnimationFrame(() => {
      document.getElementById(`contact-${first}`)?.focus();
    });
  }
}

export function ContactForm() {
  const { t, locale } = useI18n();
  const f = t.contact.form;

  const [topic, setTopic] = useState<ContactTopic | ''>('');
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState('');
  const [state, setState] = useState<SubmitState>('idle');
  const [messageLength, setMessageLength] = useState(0);

  const sentRef = useRef<HTMLDivElement>(null);
  const sendingRef = useRef(false);

  useEffect(() => {
    if (state === 'sent') {
      sentRef.current?.focus();
    }
  }, [state]);

  useEffect(() => {
    const choose = (event: Event) => {
      if (sendingRef.current) return;

      const chosen = (event as CustomEvent<string>).detail;

      if ((CONTACT_TOPICS as readonly string[]).includes(chosen)) {
        setTopic(chosen as ContactTopic);
        setState('idle');
        setFormError('');

        setErrors((previous) => {
          const next = { ...previous };
          delete next.topic;
          return next;
        });
      }
    };

    window.addEventListener(CONTACT_TOPIC_EVENT, choose);

    return () => {
      window.removeEventListener(CONTACT_TOPIC_EVENT, choose);
    };
  }, []);

  function check(data: Record<string, string>): Errors {
    const found: Errors = {};

    if (!data.topic) {
      found.topic = f.errors.topic;
    }

    if (!data.name) {
      found.name = f.errors.name;
    }

    if (!data.email && !data.phone_number) {
      found.email = f.errors.reach;
    } else if (data.email && !EMAIL.test(data.email)) {
      found.email = f.errors.email;
    }

    if (
      data.phone_number &&
      (!PHONE.test(data.phone_number) ||
        digits(data.phone_number) < 8)
    ) {
      found.phone = f.errors.phone;
    }

    if (data.message.length < 10) {
      found.message = f.errors.message;
    }

    return found;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (sendingRef.current) return;

    const form = event.currentTarget;
    const fields = new FormData(form);

    const read = (name: string) =>
      String(fields.get(name) ?? '').trim();

    const data = {
      topic: read('topic'),
      name: read('name'),
      email: read('email'),
      phone_number: read('phone_number'),
      message: read('message'),
      job_reference:
        topic === 'complaint' ? read('job_reference') : '',
      language: locale,
      website: read('website'),
    };

    const found = check(data);

    setErrors(found);
    setFormError('');

    if (FIELD_ORDER.some((field) => found[field])) {
      focusFirstError(found);
      return;
    }

    sendingRef.current = true;
    setState('sending');

    try {
      const response = await fetch(
        `${API_URL}/api/v1/marketing/contact/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(data),
        },
      );

      if (response.status === 201) {
        form.reset();
        setTopic('');
        setMessageLength(0);
        setState('sent');

        try {
          track('contact_submit', { topic: data.topic });
        } catch {
          return;
        }

        return;
      }

      setState('idle');

      if (response.status === 429) {
        setFormError(f.errors.tooMany);
        return;
      }

      if (response.status === 400) {
        const body = await response.json().catch(() => null);
        const rawDetails: unknown = body?.error?.details;

        const details: Record<string, unknown> =
          rawDetails &&
          typeof rawDetails === 'object' &&
          !Array.isArray(rawDetails)
            ? (rawDetails as Record<string, unknown>)
            : {};

        const mapped: Errors = {};

        if ('topic' in details) {
          mapped.topic = f.errors.topic;
        }

        if ('name' in details) {
          mapped.name = f.errors.name;
        }

        if ('email' in details) {
          mapped.email = data.email
            ? f.errors.email
            : f.errors.reach;
        }

        if ('phone_number' in details) {
          mapped.phone = f.errors.phone;
        }

        if ('message' in details) {
          mapped.message = f.errors.message;
        }

        if (Object.keys(mapped).length) {
          setErrors(mapped);
          focusFirstError(mapped);
          return;
        }
      }

      setFormError(f.errors.failed);
    } catch {
      setState('idle');
      setFormError(f.errors.failed);
    } finally {
      sendingRef.current = false;
    }
  }

  const describedBy = (field: Field, extra?: string) =>
    [
      errors[field] ? `contact-${field}-error` : '',
      extra ?? '',
    ]
      .filter(Boolean)
      .join(' ') || undefined;

  const errorText = (field: Field) =>
    errors[field] ? (
      <p
        id={`contact-${field}-error`}
        className="bl-form__error"
      >
        {errors[field]}
      </p>
    ) : null;

  return (
    <div className="bl-form">
      {state === 'sent' ? (
        <div
          ref={sentRef}
          tabIndex={-1}
          role="status"
          className="bl-form__success"
        >
          <Check
            size={38}
            strokeWidth={1.6}
            color="#1a1ae6"
            aria-hidden="true"
          />

          <p className="bl-form__success-title">
            {f.sent}
          </p>

          <button
            type="button"
            onClick={() => setState('idle')}
            className="bl-form__button bl-form__button--secondary"
          >
            <span>{f.sendAnother}</span>
            <ArrowUpRight
              size={19}
              strokeWidth={1.8}
              aria-hidden="true"
            />
          </button>
        </div>
      ) : (
        <form
          onSubmit={onSubmit}
          noValidate
          aria-busy={state === 'sending'}
        >
          <fieldset
            disabled={state === 'sending'}
            className="bl-form__fields"
          >
            <div className="bl-form__field">
              <label htmlFor="contact-topic">
                {f.topicLabel}
              </label>

              <div className="bl-form__select-wrap">
                <select
                  id="contact-topic"
                  name="topic"
                  value={topic}
                  onChange={(event) =>
                    setTopic(
                      event.target.value as ContactTopic | '',
                    )
                  }
                  required
                  aria-invalid={Boolean(errors.topic)}
                  aria-describedby={describedBy(
                    'topic',
                    topic === 'complaint'
                      ? 'contact-complaint-hint'
                      : undefined,
                  )}
                  data-empty={topic === '' ? '' : undefined}
                  className="bl-form__control bl-form__select"
                >
                  <option value="" disabled>
                    {f.topicPlaceholder}
                  </option>

                  {CONTACT_TOPICS.map((value) => (
                    <option key={value} value={value}>
                      {f.topics[value]}
                    </option>
                  ))}
                </select>

                <span
                  className="bl-form__select-icon"
                  aria-hidden="true"
                >
                  <ChevronDown
                    size={18}
                    strokeWidth={1.8}
                  />
                </span>
              </div>

              {errorText('topic')}

              {topic === 'complaint' && (
                <p
                  id="contact-complaint-hint"
                  className="bl-form__notice"
                >
                  {f.complaintHint}
                </p>
              )}
            </div>

            <div className="bl-form__field">
              <label htmlFor="contact-name">
                {f.nameLabel}
              </label>

              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                maxLength={120}
                required
                aria-invalid={Boolean(errors.name)}
                aria-describedby={describedBy('name')}
                className="bl-form__control"
              />

              {errorText('name')}
            </div>

            <div className="bl-form__reach">
              <div className="bl-form__field">
                <label htmlFor="contact-email">
                  {f.emailLabel}
                </label>

                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  autoCapitalize="none"
                  spellCheck={false}
                  maxLength={254}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={describedBy(
                    'email',
                    'contact-reach-hint',
                  )}
                  className="bl-form__control"
                />

                {errorText('email')}
              </div>

              <div className="bl-form__field">
                <label htmlFor="contact-phone">
                  {f.phoneLabel}
                </label>

                <input
                  id="contact-phone"
                  name="phone_number"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  maxLength={30}
                  placeholder="+224 6XX XX XX XX"
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={describedBy(
                    'phone',
                    'contact-reach-hint',
                  )}
                  className="bl-form__control"
                />

                {errorText('phone')}
              </div>

              <p
                id="contact-reach-hint"
                className="bl-form__hint"
              >
                {f.reachHint}
              </p>
            </div>

            {topic === 'complaint' && (
              <div className="bl-form__field">
                <label htmlFor="contact-job">
                  {f.jobLabel}{' '}
                  <span className="bl-form__optional">
                    ({f.optional})
                  </span>
                </label>

                <input
                  id="contact-job"
                  name="job_reference"
                  type="text"
                  maxLength={40}
                  className="bl-form__control"
                />
              </div>
            )}

            <div className="bl-form__field">
              <div className="bl-form__label-row">
                <label htmlFor="contact-message">
                  {f.messageLabel}
                </label>

                <span
                  className="bl-form__counter"
                  aria-hidden="true"
                >
                  {messageLength} / 2000
                </span>
              </div>

              <textarea
                id="contact-message"
                name="message"
                rows={5}
                minLength={10}
                maxLength={2000}
                required
                onChange={(event) =>
                  setMessageLength(event.target.value.length)
                }
                aria-invalid={Boolean(errors.message)}
                aria-describedby={describedBy('message')}
                className="bl-form__control bl-form__message"
              />

              {errorText('message')}
            </div>

            <div
              className="bl-form__honeypot"
              aria-hidden="true"
            >
              <label htmlFor="contact-website">
                Website
              </label>

              <input
                id="contact-website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {formError && (
              <p role="alert" className="bl-form__form-error">
                {formError}
              </p>
            )}

            <button
              type="submit"
              disabled={state === 'sending'}
              className="bl-form__button"
            >
              <span>
                {state === 'sending' ? f.sending : f.send}
              </span>

              <span
                className={`bl-form__button-icon${
                  state === 'sending'
                    ? ' bl-form__spinner'
                    : ''
                }`}
                aria-hidden="true"
              >
                {state === 'sending' ? (
                  <Loader2 size={20} strokeWidth={1.8} />
                ) : (
                  <ArrowUpRight size={20} strokeWidth={1.8} />
                )}
              </span>
            </button>
          </fieldset>
        </form>
      )}

      <style jsx>{`
        .bl-form {
          min-width: 0;
          color: #0f172a;
        }

        .bl-form form {
          margin: 0;
        }

        .bl-form__fields {
          display: grid;
          gap: 24px;
          min-width: 0;
          margin: 0;
          padding: 0;
          border: 0;
        }

        .bl-form__field {
          min-width: 0;
        }

        .bl-form label {
          display: block;
          margin-bottom: 10px;
          color: #172238;
          font-size: 14px;
          font-weight: 500;
          line-height: 1.5;
        }

        .bl-form__control {
          display: block;
          box-sizing: border-box;
          width: 100%;
          min-width: 0;
          min-height: 52px;
          padding: 13px 15px;
          border: 1px solid #dce2eb;
          border-radius: 12px;
          background: #fff;
          color: #0f172a;
          font: inherit;
          font-size: 16px;
          line-height: 1.5;
          transition:
            border-color 160ms ease,
            background-color 160ms ease;
        }

        .bl-form__control::placeholder {
          color: #68758b;
          opacity: 1;
        }

        .bl-form__control:focus-visible {
          border-color: var(--color-primary, #1a1ae6);
          outline: 2px solid var(--color-primary, #1a1ae6);
          outline-offset: 2px;
        }

        .bl-form__control[aria-invalid='true'] {
          border-color: #b42318;
        }

        .bl-form__control[aria-invalid='true']:focus-visible {
          outline-color: #b42318;
        }

        .bl-form__control:disabled {
          cursor: wait;
          background: #f7f8fb;
          color: #526074;
          opacity: 1;
        }

        .bl-form__select-wrap {
          position: relative;
        }

        .bl-form__select {
          appearance: none;
          padding-right: 44px;
          cursor: pointer;
        }

        .bl-form__select[data-empty] {
          color: #68758b;
        }

        .bl-form__select option {
          color: #0f172a;
        }

        .bl-form__select-icon {
          position: absolute;
          top: 50%;
          right: 15px;
          display: flex;
          color: #526074;
          pointer-events: none;
          transform: translateY(-50%);
        }

        .bl-form__reach {
          display: grid;
          gap: 20px;
          min-width: 0;
        }

        .bl-form__hint {
          margin: -8px 0 0;
          color: #617087;
          font-size: 13px;
          line-height: 1.65;
        }

        .bl-form__optional {
          color: #617087;
          font-weight: 400;
        }

        .bl-form__notice {
          margin: 12px 0 0;
          padding: 2px 0 2px 14px;
          border-left: 2px solid var(--color-accent, #f5c518);
          color: #526074;
          font-size: 13px;
          line-height: 1.75;
        }

        .bl-form__label-row {
          display: flex;
          flex-wrap: wrap;
          align-items: baseline;
          justify-content: space-between;
          gap: 4px 16px;
          margin-bottom: 10px;
        }

        .bl-form__label-row label {
          margin-bottom: 0;
        }

        .bl-form__counter {
          color: #68758b;
          font-size: 12px;
          line-height: 1.5;
          font-variant-numeric: tabular-nums;
        }

        .bl-form__message {
          min-height: 150px;
          resize: vertical;
        }

        .bl-form :global(.bl-form__error) {
          margin: 8px 0 0;
          color: #b42318;
          font-size: 13px;
          line-height: 1.6;
        }

        .bl-form__form-error {
          margin: 0;
          padding: 14px 16px;
          border: 1px solid #f3c8c4;
          border-radius: 12px;
          background: #fff6f5;
          color: #9d241b;
          font-size: 14px;
          line-height: 1.65;
        }

        .bl-form__button {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          width: 100%;
          min-height: 54px;
          padding: 15px 20px;
          border: 1px solid transparent;
          border-radius: 12px;
          background: var(--color-primary, #1a1ae6);
          color: #fff;
          font: inherit;
          font-size: 15px;
          font-weight: 600;
          line-height: 1.5;
          text-align: left;
          cursor: pointer;
          transition:
            background-color 160ms ease,
            border-color 160ms ease;
        }

        .bl-form__button:focus-visible {
          outline: 3px solid var(--color-primary, #1a1ae6);
          outline-offset: 4px;
        }

        .bl-form__button:disabled {
          background: #4747b7;
          cursor: wait;
        }

        .bl-form__button-icon {
          display: flex;
          flex-shrink: 0;
        }

        .bl-form__spinner {
          animation: bl-form-spin 900ms linear infinite;
        }

        .bl-form__button--secondary {
          width: auto;
          max-width: 100%;
          border-color: #dce2eb;
          background: #fff;
          color: #0f172a;
        }

        .bl-form__success {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 24px;
          min-height: 260px;
          padding-block: 16px;
        }

        .bl-form__success:focus {
          outline: none;
        }

        .bl-form__success-title {
          max-width: 26ch;
          margin: 0;
          font-size: clamp(1.5rem, 3vw, 2rem);
          font-weight: 500;
          line-height: 1.35;
          letter-spacing: -0.035em;
          text-wrap: pretty;
        }

        .bl-form__honeypot {
          position: absolute;
          width: 1px;
          height: 1px;
          margin: -1px;
          padding: 0;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          clip-path: inset(50%);
          white-space: nowrap;
          border: 0;
        }

        @keyframes bl-form-spin {
          to {
            transform: rotate(360deg);
          }
        }

        @media (hover: hover) {
          .bl-form__control:not(:disabled):not(:focus-visible):not(
              [aria-invalid='true']
            ):hover {
            border-color: #a8b3c6;
          }

          .bl-form__button:not(:disabled):hover {
            background: #1414ba;
          }

          .bl-form__button--secondary:not(:disabled):hover {
            border-color: #a8b3c6;
            background: #f7f8fb;
          }
        }

        @media (min-width: 640px) {
          .bl-form__reach {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 16px;
          }

          .bl-form__hint {
            grid-column: 1 / -1;
            margin-top: -4px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .bl-form__control,
          .bl-form__button {
            transition: none;
          }

          .bl-form__spinner {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}