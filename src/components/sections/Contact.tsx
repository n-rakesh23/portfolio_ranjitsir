import { Reveal, Section, SectionHeading } from '../ui';
import { useMode } from '../../hooks/useMode';
import { ContactForm } from './contact/ContactForm';
import { ContactInfo } from './contact/ContactInfo';

export default function Contact() {
  const { mode, content } = useMode();
  const labels = content.sections['contact'];

  return (
    <Section id="contact" labelledBy="contact-heading">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <SectionHeading id="contact-heading" className="mb-8" {...labels} />
          <ContactInfo />
        </Reveal>
        <Reveal index={1} className="lg:col-span-7">
          <ContactForm key={mode} />
        </Reveal>
      </div>
    </Section>
  );
}
