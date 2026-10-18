/** BaraLink's contact details, in one place for the header, the contact section and search engines. */

export const PHONES = ['+224 622 46 25 59', '+224 623 04 34 21'];
export const WHATSAPP_PHONE = PHONES[0];

// A placeholder until the mailbox on baralink.org exists (owner, 2026-10-17).
export const SUPPORT_EMAIL = 'support@baralink.org';

/** Official social accounts (verified 2026-10-18, tracking parameters stripped). */
export const SOCIAL_LINKS = {
  linkedin: 'https://www.linkedin.com/company/baralinkapp/',
  facebook: 'https://www.facebook.com/share/1K3WJYYwfa/',
  tiktok: 'https://www.tiktok.com/@baralink',
  instagram: 'https://www.instagram.com/_baralink/',
} as const;

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

export function whatsappHref(phone: string = WHATSAPP_PHONE) {
  return `https://wa.me/${phone.replace(/\D/g, '')}`;
}

/** Sent by a "Business account" or "Partnership" shortcut: the form opens on that topic. */
export const CONTACT_TOPIC_EVENT = 'baralink:contact-topic';
