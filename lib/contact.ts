/** BaraLink's contact details, in one place for the header, the contact section and search engines. */

export const PHONES = ['+224 622 46 25 59', '+224 623 04 34 21'];

// A placeholder until the mailbox on baralink.org exists (owner, 2026-10-17).
export const SUPPORT_EMAIL = 'support@baralink.org';

/** The backend that receives the contact form (`CORS_ALLOWED_ORIGINS` must list this site). */
export const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'https://api.baralink.org').replace(/\/$/, '');

export const CONTACT_TOPICS = [
  'general',
  'business',
  'partnership',
  'sponsorship',
  'ambassador',
  'press',
  'complaint',
  'other',
] as const;
export type ContactTopic = (typeof CONTACT_TOPICS)[number];

export function telHref(phone: string) {
  return `tel:${phone.replace(/\s/g, '')}`;
}
