'use client';

import { useState, type FormEvent } from 'react';
import { Check, Loader2 } from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nProvider';
import { API_URL } from '@/lib/contact';
import { track } from '@/lib/analytics';
import { Button } from '@/components/ui/Button';
import { LegalArticle, LegalBack, LegalParagraph } from '@/components/legal/LegalArticle';

const FIELD = 'flex flex-col gap-2';
const LABEL = 'text-[14px] font-medium text-ink';
const CONTROL = 'w-full rounded-xl border border-[#dce2eb] bg-white px-4 py-3 text-[16px]';

type Step = 'phone' | 'details' | 'sent';

const MAX_DOCUMENTS = 3;
const MAX_BYTES = 10 * 1024 * 1024;
const TYPES = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];

/** The two calls of the cash application (POST /api/v1/payments/cash/applications/…). */
export function CashApplicationContent() {
  const { t } = useI18n();
  const c = t.cashApplication;

  const [step, setStep] = useState<Step>('phone');
  const [phone, setPhone] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function requestCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setError('');
    if (phone.replace(/\D/g, '').length < 8) {
      setError(c.errors.phone);
      return;
    }
    setBusy(true);
    try {
      const response = await fetch(`${API_URL}/api/v1/payments/cash/applications/code/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ phone }),
      });
      if (response.ok) {
        const body = await response.json();
        setVerificationId(String(body.verificationid || ''));
        setStep('details');
        track('cash_application_code_request', {});
        return;
      }
      setError(response.status === 429 ? c.errors.tooMany : c.errors.failed);
    } catch {
      setError(c.errors.failed);
    } finally {
      setBusy(false);
    }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setError('');
    const form = new FormData(event.currentTarget);
    const documents = form.getAll('documents').filter((file): file is File => file instanceof File && file.size > 0);
    if (!String(form.get('code') || '').trim()) {
      setError(c.errors.code);
      return;
    }
    if (!String(form.get('message') || '').trim()) {
      setError(c.errors.message);
      return;
    }
    if (documents.length < 1 || documents.length > MAX_DOCUMENTS) {
      setError(c.errors.documents);
      return;
    }
    if (documents.some((file) => file.size > MAX_BYTES || !TYPES.includes(file.type))) {
      setError(c.errors.documentType);
      return;
    }
    const body = new FormData();
    body.set('phone', phone);
    body.set('verificationid', verificationId);
    body.set('code', String(form.get('code')));
    body.set('message', String(form.get('message')));
    documents.forEach((file) => body.append('documents', file));

    setBusy(true);
    try {
      const response = await fetch(`${API_URL}/api/v1/payments/cash/applications/`, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body,
      });
      if (response.status === 201) {
        setStep('sent');
        track('cash_application_submit', { documents: String(documents.length) });
        return;
      }
      const answer = await response.json().catch(() => null);
      const code: string | undefined = answer?.error?.code;
      if (response.status === 429) setError(c.errors.tooMany);
      else if (code === 'CASH_APPLICATION_WAITING') setError(c.errors.waiting);
      else if (code === 'CASH_DOCUMENT_INVALID') setError(c.errors.documentType);
      else if (response.status === 400) setError(c.errors.code);
      else setError(c.errors.failed);
    } catch {
      setError(c.errors.failed);
    } finally {
      setBusy(false);
    }
  }

  return (
    <LegalArticle title={c.title} updated={c.updated} intro={c.intro}>
      {c.body.map((paragraph) => (
        <LegalParagraph key={paragraph.slice(0, 32)}>{paragraph}</LegalParagraph>
      ))}
      <div className="mt-8 max-w-xl">
        {step === 'sent' ? (
          <div role="status" className="flex flex-col items-start gap-3">
            <Check size={38} strokeWidth={1.6} color="#1a1ae6" aria-hidden="true" />
            <p className="t-lead font-semibold">{c.sent}</p>
          </div>
        ) : step === 'phone' ? (
          <form onSubmit={requestCode} noValidate aria-busy={busy}>
            <fieldset disabled={busy} className="flex flex-col gap-5">
              <div className={FIELD}>
                <label htmlFor="cash-phone" className={LABEL}>{c.phoneLabel}</label>
                <input
                  id="cash-phone"
                  type="tel"
                  autoComplete="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  className={CONTROL}
                  placeholder="+224 6XX XX XX XX"
                />
              </div>
              {error && <p className="text-[14px] text-red-700" role="alert">{error}</p>}
              <Button type="submit" className="self-start">
                {busy && <Loader2 size={18} className="animate-spin" aria-hidden="true" />}
                <span>{c.sendCode}</span>
              </Button>
            </fieldset>
          </form>
        ) : (
          <form onSubmit={submit} noValidate aria-busy={busy}>
            <fieldset disabled={busy} className="flex flex-col gap-5">
              <p>{c.codeSent}</p>
              <div className={FIELD}>
                <label htmlFor="cash-code" className={LABEL}>{c.codeLabel}</label>
                <input id="cash-code" name="code" inputMode="numeric" autoComplete="one-time-code" className={CONTROL} />
              </div>
              <div className={FIELD}>
                <label htmlFor="cash-message" className={LABEL}>{c.messageLabel}</label>
                <textarea id="cash-message" name="message" rows={4} maxLength={2000} className={CONTROL} />
              </div>
              <div className={FIELD}>
                <label htmlFor="cash-documents" className={LABEL}>{c.documentsLabel}</label>
                <input
                  id="cash-documents"
                  name="documents"
                  type="file"
                  multiple
                  accept={TYPES.join(',')}
                  className={CONTROL}
                />
                <p className="text-[14px] text-ink-soft">{c.documentsHint}</p>
              </div>
              {error && <p className="text-[14px] text-red-700" role="alert">{error}</p>}
              <Button type="submit" className="self-start">
                {busy && <Loader2 size={18} className="animate-spin" aria-hidden="true" />}
                <span>{c.submit}</span>
              </Button>
            </fieldset>
          </form>
        )}
      </div>
      <LegalBack label={c.back} />
    </LegalArticle>
  );
}
