'use client';

import React from 'react';
import PrimaryButton from '@/components/PrimaryButton';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Phone, User } from 'lucide-react';
import { SeatInterface } from '@/interfaces/seat.interface';
import { addReservationService } from '@/services/reservation.service';
import { toast } from 'sonner';

const formSchema = z.object({
  name: z.string().trim().min(3, 'Nom requis'),
  phone: z.string().trim().min(10, 'Numéro de téléphone requis'),
});

type FormValues = z.infer<typeof formSchema>;

export default function AddReservation({
  reservation,
  setScrollToPayment,
  onClose,
}: {
  reservation: SeatInterface;
  setScrollToPayment: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: () => void;
}) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [takenError, setTakenError] = React.useState('');

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    const parseRes = formSchema.safeParse(data);

    if (parseRes.success) {
      // API CALL
      setIsLoading(true);

      const res = await addReservationService({
        seatId: reservation.id,
        name: parseRes.data.name,
        phone: parseRes.data.phone,
      });

      if (res.alreadyTaken) {
        setTakenError('Place déjà occupé');
        setIsLoading(false);
        toast.error('Cette place a été déjà prise');
      } else if (res.seat) {
        toast.success('Votre résérvation est prise en compte', {
          description: 'Veuillez effectuer le paiement',
        });
        setScrollToPayment(true);
        onClose();
      }
    }
  };

  return (
    <div className="w-[24rem] flex flex-col gap-4 p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <h2 className="text-4xl text-center font-semibold bg-gradient-to-b from-yellow-500 to-yellow-500/50 bg-clip-text text-transparent">
              Renseigner vos informations
            </h2>

            <h3 className="text-xl text-center font-bold">
              Place n°: {reservation.order}
            </h3>

            <div className="flex flex-col gap-3">
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      htmlFor="name"
                      className="text-base text-[var(--text-primary-color)]"
                    >
                      Nom
                    </FormLabel>
                    <FormControl>
                      <div className="relative flex items-center">
                        <Input
                          id="name"
                          {...field}
                          autoComplete="off"
                          className="h-12 ps-16 text-[var(--text-primary-color)] border-[var(--text-primary-color)]/25 placeholder:text-[var(--text-tertiary-gray)]"
                          placeholder="Votre nom"
                          autoFocus
                          required
                        />
                        <i className="absolute left-4 border-r pe-3 text-[var(--text-primary-color)]/70">
                          <User size={20} />
                        </i>
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs">
                      {form.formState.errors.name?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                name="phone"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      htmlFor="phone"
                      className="text-base text-[var(--text-primary-color)]"
                    >
                      Numéro de téléphone
                    </FormLabel>
                    <FormControl>
                      <div className="relative flex items-center">
                        <Input
                          id="phone"
                          {...field}
                          autoComplete="off"
                          className="h-12 ps-16 text-[var(--text-primary-color)] border-[var(--text-primary-color)]/25 placeholder:text-[var(--text-tertiary-gray)]"
                          placeholder="03*********"
                          required
                        />
                        <i className="absolute left-4 border-r pe-3 text-[var(--text-primary-color)]/70">
                          <Phone size={20} />
                        </i>
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs">
                      {form.formState.errors.name?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormMessage>{takenError}</FormMessage>
            </div>

            <PrimaryButton
              type="submit"
              label="Réserver"
              isLoading={isLoading}
              className="w-full py-2.5"
            />
          </div>
        </form>
      </Form>
    </div>
  );
}
