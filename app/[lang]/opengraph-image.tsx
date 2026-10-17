import { ImageResponse } from 'next/og';
import { dictionaries } from '@/lib/i18n/dictionaries';
import { LOCALES, hasLocale } from '@/lib/i18n/locales';

// The card a shared link shows on WhatsApp, Facebook or LinkedIn, in the page's language.
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'BaraLink';

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const meta = dictionaries[hasLocale(lang) ? lang : 'fr'].meta;
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: '#1a1ae6',
          color: '#ffffff',
        }}
      >
        <div style={{ display: 'flex', fontSize: 56, fontWeight: 700, color: '#f5c518' }}>BaraLink</div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.1, maxWidth: 1000 }}>{meta.ogHeadline}</div>
          <div style={{ marginTop: 28, fontSize: 34, opacity: 0.85, maxWidth: 1000 }}>{meta.ogSubline}</div>
        </div>
        <div style={{ display: 'flex', fontSize: 28, opacity: 0.75 }}>baralink.org · {meta.ogPlace}</div>
      </div>
    ),
    size,
  );
}
