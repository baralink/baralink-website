'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useI18n } from '@/lib/i18n/I18nProvider';
import { API_URL, CONTACT_TOPICS, CONTACT_TOPIC_EVENT, type ContactTopic } from '@/lib/contact';
import { track } from '@/lib/analytics';

type Field = 'topic' | 'name' | 'email' | 'phone' | 'message';
type Errors = Partial<Record<Field, string>>;

const PHONE = /^\+?[0-9 ().-]{8,30}$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputClass =
  'w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 placeholder-slate-400 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 aria-[invalid=true]:border-red-500';
const labelClass = 'mb-1.5 block text-sm font-medium text-slate-700';

function digits(value: string) {
  return value.replace(/\D/g, '').length;
}

/**
 * The website's contact form: POST /api/v1/marketing/contact/ on the backend, where staff
 * read it (Admin → Contact messages). Analytics receives the topic only (`contact_submit`).
 */
export function ContactForm() {
  const { t, locale } = useI18n();
  const f = t.contact.form;
  const [topic, setTopic] = useState<ContactTopic | ''>('');
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'sent'>('idle');
  const sentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state === 'sent') sentRef.current?.focus();
  }, [state]);

  useEffect(() => {
    const choose = (event: Event) => {
      const chosen = (event as CustomEvent<string>).detail;
      if ((CONTACT_TOPICS as readonly string[]).includes(chosen)) {
        setTopic(chosen as ContactTopic);
        setState('idle');
      }
    };
    window.addEventListener(CONTACT_TOPIC_EVENT, choose);
    return () => window.removeEventListener(CONTACT_TOPIC_EVENT, choose);
  }, []);

  function check(data: Record<string, string>): Errors {
    const found: Errors = {};
    if (!data.topic) found.topic = f.errors.topic;
    if (!data.name) found.name = f.errors.name;
    if (!data.email && !data.phone_number) found.email = f.errors.reach;
    else if (data.email && !EMAIL.test(data.email)) found.email = f.errors.email;
    if (data.phone_number && (!PHONE.test(data.phone_number) || digits(data.phone_number) < 8)) found.phone = f.errors.phone;
    if (data.message.length < 10) found.message = f.errors.message;
    return found;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const read = (name: string) => String(new FormData(form).get(name) ?? '').trim();
    const data = {
      topic: read('topic'),
      name: read('name'),
      email: read('email'),
      phone_number: read('phone_number'),
      message: read('message'),
      job_reference: topic === 'complaint' ? read('job_reference') : '',
      language: locale,
      website: read('website'),
    };
    const found = check(data);
    setErrors(found);
    setFormError('');
    const first = (['topic', 'name', 'email', 'phone', 'message'] as Field[]).find((field) => found[field]);
    if (first) {
      document.getElementById(`contact-${first}`)?.focus();
      return;
    }

    setState('sending');
    try {
      const response = await fetch(`${API_URL}/api/v1/marketing/contact/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.status === 201) {
        track('contact_submit', { topic: data.topic });
        form.reset();
        setTopic('');
        setState('sent');
        return;
      }
      setState('idle');
      if (response.status === 429) {
        setFormError(f.errors.tooMany);
        return;
      }
      if (response.status === 400) {
        // The backend's envelope: {"error": {"details": {"field": ["…"]}}}. Its English text
        // is not shown: each field gets this page's own message.
        const body = await response.json().catch(() => null);
        const details: Record<string, unknown> = body?.error?.details ?? {};
        const mapped: Errors = {};
        if ('topic' in details) mapped.topic = f.errors.topic;
        if ('name' in details) mapped.name = f.errors.name;
        if ('email' in details) mapped.email = data.email ? f.errors.email : f.errors.reach;
        if ('phone_number' in details) mapped.phone = f.errors.phone;
        if ('message' in details) mapped.message = f.errors.message;
        if (Object.keys(mapped).length) {
          setErrors(mapped);
          return;
        }
      }
      setFormError(f.errors.failed);
    } catch {
      setState('idle');
      setFormError(f.errors.failed);
    }
  }

  if (state === 'sent') {
    return (
      <div ref={sentRef} tabIndex={-1} role="status" className="flex flex-col items-start gap-6 outline-none">
        <p className="text-lg font-semibold text-slate-900">{f.sent}</p>
        <button
          type="button"
          onClick={() => setState('idle')}
          className="min-h-11 rounded-full border border-slate-300 px-6 py-2.5 text-sm font-semibold text-slate-900 transition hover:border-slate-900"
        >
          {f.sendAnother}
        </button>
      </div>
    );
  }

  const describedBy = (field: Field, extra?: string) =>
    [errors[field] ? `contact-${field}-error` : '', extra ?? ''].filter(Boolean).join(' ') || undefined;
  const errorText = (field: Field) =>
    errors[field] ? (
      <p id={`contact-${field}-error`} className="mt-1.5 text-sm text-red-600">
        {errors[field]}
      </p>
    ) : null;

  return (
    <form className="space-y-5" onSubmit={onSubmit} noValidate>
      <div>
        <label htmlFor="contact-topic" className={labelClass}>
          {f.topicLabel}
        </label>
        <select
          id="contact-topic"
          name="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value as ContactTopic | '')}
          aria-invalid={Boolean(errors.topic)}
          aria-describedby={describedBy('topic')}
          className={`${inputClass} appearance-none`}
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
        {errorText('topic')}
        {topic === 'complaint' && (
          <p className="mt-2 rounded-xl bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900">{f.complaintHint}</p>
        )}
      </div>

      <div>
        <label htmlFor="contact-name" className={labelClass}>
          {f.nameLabel}
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          maxLength={120}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={describedBy('name')}
          className={inputClass}
        />
        {errorText('name')}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-email" className={labelClass}>
            {f.emailLabel}
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={254}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy('email', 'contact-reach-hint')}
            className={inputClass}
          />
          {errorText('email')}
        </div>
        <div>
          <label htmlFor="contact-phone" className={labelClass}>
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
            aria-describedby={describedBy('phone', 'contact-reach-hint')}
            className={inputClass}
          />
          {errorText('phone')}
        </div>
        <p id="contact-reach-hint" className="-mt-3 text-sm text-slate-500 sm:col-span-2">
          {f.reachHint}
        </p>
      </div>

      {topic === 'complaint' && (
        <div>
          <label htmlFor="contact-job" className={labelClass}>
            {f.jobLabel} <span className="font-normal text-slate-500">({f.optional})</span>
          </label>
          <input id="contact-job" name="job_reference" type="text" maxLength={40} className={inputClass} />
        </div>
      )}

      <div>
        <label htmlFor="contact-message" className={labelClass}>
          {f.messageLabel}
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          maxLength={2000}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={describedBy('message')}
          className={`${inputClass} resize-none`}
        />
        {errorText('message')}
      </div>

      {/* Left empty by people (they never see it); a robot filling it is ignored by the backend. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {formError && (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {formError}
        </p>
      )}

      <button
        type="submit"
        disabled={state === 'sending'}
        className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-primary px-7 py-3 text-base font-semibold text-white transition hover:bg-primary-dark disabled:opacity-60"
      >
        {state === 'sending' ? f.sending : f.send}
      </button>
    </form>
  );
}
