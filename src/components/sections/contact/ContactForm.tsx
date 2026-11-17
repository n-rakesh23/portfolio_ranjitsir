import { zodResolver } from '@hookform/resolvers/zod';
import { CircleAlert, CircleCheck, LoaderCircle, RotateCcw, Send } from 'lucide-react';
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { useMode } from '../../../hooks/useMode';
import { cn } from '../../../lib/cn';
import { Button, Card } from '../../ui';
import { buildContactSchema, type ContactFormValues } from './schema';
import { submitContact } from './submit';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const fieldClasses =
  'w-full rounded-theme border bg-surface-2 px-4 text-text placeholder:text-text-muted ' +
  'transition-colors duration-150 focus-visible:border-primary';

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-text">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1.5 text-sm text-error">
          <CircleAlert aria-hidden size={16} className="shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm() {
  const { mode, content, enquiryType } = useMode();
  const c = content.contact;
  const S = c.form;
  const values = useMemo(() => c.enquiryOptions.map((o) => o.value), [c.enquiryOptions]);
  const schema = useMemo(() => buildContactSchema(values, S.errors), [values, S.errors]);
  const initialEnquiry = enquiryType && values.includes(enquiryType) ? enquiryType : c.defaultEnquiry;

  const [status, setStatus] = useState<Status>('idle');
  const successRef = useRef<HTMLHeadingElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(schema),
    mode: 'onTouched',
    defaultValues: { name: '', email: '', enquiryType: initialEnquiry, message: '', _gotcha: '' },
  });

  useEffect(() => {
    if (enquiryType && values.includes(enquiryType)) {
      setValue('enquiryType', enquiryType, { shouldDirty: true });
    }
  }, [enquiryType, values, setValue]);

  useEffect(() => {
    if (status === 'success') successRef.current?.focus();
  }, [status]);

  const onSubmit = handleSubmit(async (data) => {
    setStatus('submitting');
    try {
      await submitContact(data, mode);
      setStatus('success');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  });

  const describedBy = (name: keyof ContactFormValues) => (errors[name] ? `contact-${name}-error` : undefined);
  const borderFor = (name: keyof ContactFormValues) => (errors[name] ? 'border-error' : 'border-border');

  if (status === 'success') {
    return (
      <Card className="flex flex-col items-start gap-4 p-6 md:p-8" role="status">
        <CircleCheck aria-hidden size={40} className="text-success" />
        <h3 ref={successRef} tabIndex={-1} className="outline-none">
          {c.successTitle}
        </h3>
        <p className="text-text-muted">{c.successMessage}</p>
        <Button
          variant="secondary"
          onClick={() => {
            reset({ name: '', email: '', enquiryType: initialEnquiry, message: '', _gotcha: '' });
            setStatus('idle');
          }}
        >
          {S.sendAnother}
        </Button>
      </Card>
    );
  }

  const submitting = status === 'submitting';

  return (
    <Card className="p-6 md:p-8">
      <form noValidate onSubmit={onSubmit} className="space-y-5" aria-busy={submitting}>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="contact-name" label={S.name} error={errors.name?.message}>
            <input
              id="contact-name"
              type="text"
              autoComplete="name"
              aria-invalid={!!errors.name}
              aria-describedby={describedBy('name')}
              className={cn(fieldClasses, 'h-12', borderFor('name'))}
              {...register('name')}
            />
          </Field>
          <Field id="contact-email" label={S.email} error={errors.email?.message}>
            <input
              id="contact-email"
              type="email"
              autoComplete="email"
              inputMode="email"
              aria-invalid={!!errors.email}
              aria-describedby={describedBy('email')}
              className={cn(fieldClasses, 'h-12', borderFor('email'))}
              {...register('email')}
            />
          </Field>
        </div>

        <Field id="contact-enquiryType" label={S.enquiryType} error={errors.enquiryType?.message}>
          <select
            id="contact-enquiryType"
            aria-invalid={!!errors.enquiryType}
            aria-describedby={describedBy('enquiryType')}
            className={cn(fieldClasses, 'h-12', borderFor('enquiryType'))}
            {...register('enquiryType')}
          >
            {c.enquiryOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>

        <Field id="contact-message" label={S.message} error={errors.message?.message}>
          <textarea
            id="contact-message"
            rows={6}
            aria-invalid={!!errors.message}
            aria-describedby={describedBy('message')}
            className={cn(fieldClasses, 'resize-y py-3', borderFor('message'))}
            {...register('message')}
          />
        </Field>

        <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
          <label htmlFor="contact-gotcha">{S.honeypot}</label>
          <input id="contact-gotcha" type="text" tabIndex={-1} autoComplete="off" {...register('_gotcha')} />
        </div>

        {status === 'error' && (
          <div
            role="alert"
            className="flex flex-col gap-3 rounded-theme border border-error bg-surface-2 p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <p className="flex items-start gap-2 text-sm text-text">
              <CircleAlert aria-hidden size={18} className="mt-0.5 shrink-0 text-error" />
              {c.errorMessage}
            </p>
            <Button
              variant="secondary"
              size="sm"
              iconLeft={<RotateCcw aria-hidden size={16} />}
              onClick={() => void onSubmit()}
            >
              {S.retry}
            </Button>
          </div>
        )}

        <Button
          type="submit"
          size="lg"
          disabled={submitting}
          className="w-full sm:w-auto"
          iconRight={
            submitting ? (
              <LoaderCircle aria-hidden size={18} className="motion-safe:animate-spin" />
            ) : (
              <Send aria-hidden size={18} />
            )
          }
        >
          {submitting ? S.sending : c.submitLabel}
        </Button>
      </form>
    </Card>
  );
}
