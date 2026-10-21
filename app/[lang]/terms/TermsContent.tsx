'use client';

import { useI18n } from '@/lib/i18n/I18nProvider';
import { LegalArticle, LegalBack, LegalParagraph, LegalSection } from '@/components/legal/LegalArticle';

export function TermsContent() {
  const { t } = useI18n();
  const terms = t.terms;

  return (
    <LegalArticle title={terms.title} updated={terms.updated} intro={terms.intro}>
      {terms.sections.map((section) => (
        <LegalSection key={section.id} id={section.id} title={section.title}>
          {section.body.map((paragraph) => (
            <LegalParagraph key={paragraph.slice(0, 32)}>{paragraph}</LegalParagraph>
          ))}
        </LegalSection>
      ))}
      <LegalBack label={terms.back} />
    </LegalArticle>
  );
}
