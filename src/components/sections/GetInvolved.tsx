import { Reveal, Section, SectionHeading } from '../ui';
import { useMode } from '../../hooks/useMode';
import { OfferCard } from './get-involved/OfferCard';

export default function GetInvolved() {
  const { mode, content, setEnquiryType } = useMode();
  const labels = content.sections['get-involved'];

  return (
    <Section id="get-involved" labelledBy="get-involved-heading">
      <SectionHeading id="get-involved-heading" align="center" {...labels} />
      <ul className="grid gap-6 md:grid-cols-3 md:items-stretch">
        {content.offers.map((offer, i) => (
          <Reveal as="li" key={offer.id} index={i} className="h-full">
            <OfferCard
              offer={offer}
              mode={mode}
              badgeFallback={content.labels.mostRequested}
              onContactCta={(type) => setEnquiryType(type ?? null)}
            />
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
