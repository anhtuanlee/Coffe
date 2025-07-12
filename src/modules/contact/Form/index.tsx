import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/components/Input';
import ButtonPrimary from '@/components/ButtonPrimary';
import { cn } from '@/utils/uiHelper';
import Fade from '@/interactive/Fade';
import { delay_trigger } from '@/constants/delay';

export default function FormContact() {
  const schemaContact = z.object({
    name: z.string().min(1),
    email: z.string().email('Invalid email address'),
    phone: z
      .string()
      .regex(/^[0-9]*$/, 'Phone number must contain only numbers')
      .optional(),
    message: z.string().min(1),
  });
  const form = useForm<z.infer<typeof schemaContact>>({
    resolver: zodResolver(schemaContact),
    defaultValues: {
      name: '',
      email: '',
      phone: undefined,
      message: '',
    },
    mode: 'onSubmit',
  });
  const onSubmit = async (data: z.infer<typeof schemaContact>) => {
    try {
      const res = await fetch('/api/resend', {
        method: 'POST',
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          message: data.message,
        }),
      });
      if (!res.ok) {
        throw new Error('Failed to send message');
      }
      form.reset();
    } catch (error) {
      console.error(error);
      form.setError('message', {
        message: 'Failed to send message',
      });
    }
  };
  return (
    <Fade delayEnter={delay_trigger._2} delayTrigger={delay_trigger._2}>
      <div className="w-full">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mb-10 flex flex-col gap-8">
            <div className="relative flex flex-col gap-2">
              <Input label="Name" placeholder="Name" {...form.register('name')} name="name" />
              {form.formState.errors.name && (
                <p
                  className={cn(
                    'duration-400 absolute top-[calc(100%+0.5rem)] block !text-14 text-red-500 opacity-0 transition-opacity',
                    form.formState.errors.name.message && 'opacity-100'
                  )}
                >
                  <span className="">{form.formState.errors.name.message}</span>
                </p>
              )}
            </div>
            <div className="relative flex flex-col gap-2">
              <Input label="Email" placeholder="Email" {...form.register('email')} name="email" />
              {form.formState.errors.email && (
                <p
                  className={cn(
                    'duration-400 absolute top-[calc(100%+0.5rem)] block !text-14 text-red-500 opacity-0 transition-opacity',
                    form.formState.errors.email.message && 'opacity-100'
                  )}
                >
                  <span className="">{form.formState.errors.email.message}</span>
                </p>
              )}
            </div>
            <div className="relative flex flex-col gap-2">
              <Input
                label="Phone (Optional)"
                placeholder="Phone"
                {...form.register('phone', {
                  onChange: (e) => {
                    const value = e.target.value.replace(/[^0-9]/g, '');
                    e.target.value = value;
                    return value;
                  },
                })}
                name="phone"
              />
              {form.formState.errors.phone && (
                <p
                  className={cn(
                    'duration-400 absolute top-[calc(100%+0.5rem)] block !text-14 text-red-500 opacity-0 transition-opacity',
                    form.formState.errors.phone.message && 'opacity-100'
                  )}
                >
                  <span className="">{form.formState.errors.phone.message}</span>
                </p>
              )}
            </div>
            <div className="relative flex flex-col gap-2">
              <Input
                label="Message"
                placeholder="Message"
                {...form.register('message')}
                name="message"
              />
              {form.formState.errors.message && (
                <p
                  className={cn(
                    'duration-400 absolute top-[calc(100%+0.5rem)] block !text-14 text-red-500 opacity-0 transition-opacity',
                    form.formState.errors.message.message && 'opacity-100'
                  )}
                >
                  <span className="">{form.formState.errors.message.message}</span>
                </p>
              )}
            </div>
          </div>
          <ButtonPrimary className="w-full" type="submit">
            <span className="text-txt-light-white">
              {form.formState.isSubmitting ? 'Submitting...' : 'Submit'}
            </span>
          </ButtonPrimary>
        </form>
      </div>
    </Fade>
  );
}
