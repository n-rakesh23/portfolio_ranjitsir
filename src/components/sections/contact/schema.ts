import { z } from 'zod';
import type { ContactFormLabels } from '../../../data/types';

export const MESSAGE_MIN = 20;

export function buildContactSchema(enquiryValues: string[], e: ContactFormLabels['errors']) {
  return z.object({
    name: z.string().trim().min(1, e.nameRequired),
    email: z.string().trim().pipe(z.email(e.emailInvalid)),
    enquiryType: z.string().refine((v) => enquiryValues.includes(v), e.enquiryRequired),
    message: z.string().trim().min(MESSAGE_MIN, e.messageMin),
    _gotcha: z.string().optional(),
  });
}

export type ContactFormValues = z.infer<ReturnType<typeof buildContactSchema>>;
