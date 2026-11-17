import type { Mode } from '../../../data/types';
import type { ContactFormValues } from './schema';

export async function submitContact(values: ContactFormValues, mode: Mode): Promise<void> {
  // Bots fill the honeypot; pretend success so they get no signal.
  if (values._gotcha) return;

  const id = import.meta.env.VITE_FORMSPREE_ID;
  if (!id) throw new Error('VITE_FORMSPREE_ID is not set');

  const res = await fetch(`https://formspree.io/f/${encodeURIComponent(id)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      name: values.name,
      email: values.email,
      enquiryType: values.enquiryType,
      message: values.message,
      mode,
      _subject: `[${mode}] ${values.enquiryType} enquiry from ${values.name}`,
    }),
  });
  if (!res.ok) throw new Error(`Formspree responded ${res.status}`);
}
