'use client';

import { useI18n } from '@/lib/i18n/I18nProvider';
import { LegalArticle, LegalBack, LegalParagraph, LegalSection } from '@/components/legal/LegalArticle';
import { REVAMP_PHASE } from '@/lib/revamp';

export function TermsContent() {
  const { t } = useI18n();
  const terms = t.terms;
  // The revamp's rules appear after "Payments" once their phase is live (lib/revamp.ts).
  const revamp = terms.revampSections.filter((section) => section.phase <= REVAMP_PHASE);
  const sections = terms.sections.flatMap((section) => (section.id === 'payments' ? [section, ...revamp] : [section]));

  return (
    <LegalArticle title={terms.title} updated={terms.updated} intro={terms.intro}>
      {sections.map((section) => (
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
