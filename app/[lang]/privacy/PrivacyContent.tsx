'use client';

import { useI18n } from '@/lib/i18n/I18nProvider';
import { openConsentSettings } from '@/lib/analytics';
import { Button } from '@/components/ui/Button';
import { LegalArticle, LegalBack, LegalParagraph, LegalSection } from '@/components/legal/LegalArticle';

export function PrivacyContent() {
  const { t } = useI18n();
  const p = t.privacy;

  return (
    <LegalArticle title={p.title} updated={p.updated} intro={p.intro}>
      {p.sections.map((section) => (
        <LegalSection key={section.id} id={section.id} title={section.title}>
          {section.body.map((paragraph) => (
            <LegalParagraph key={paragraph.slice(0, 32)}>{paragraph}</LegalParagraph>
          ))}
          {section.id === 'analytics' && (
            <Button variant="secondary" className="mt-6" onClick={openConsentSettings}>
              {t.footer.cookies}
            </Button>
          )}
        </LegalSection>
      ))}
      <LegalBack label={p.back} />
    </LegalArticle>
  );
}
