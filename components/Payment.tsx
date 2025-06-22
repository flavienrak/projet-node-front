'use client';

import React from 'react';
import PrimaryButton from '@/components/PrimaryButton';

import { SeatInterface } from '@/interfaces/seat.interface';
import {
  addReservationService,
  mvolaPaymetService,
} from '@/services/reservation.service';
import { toast } from 'sonner';
import { PaymentType } from '@/PaymentType';

export default function Payment({
  type,
  reservations,
  onClose,
}: {
  type: PaymentType;
  reservations: SeatInterface[];
  onClose: () => void;
}) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [takenError, setTakenError] = React.useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // API CALL
    setIsLoading(true);

    const res = await mvolaPaymetService(reservations.map((item) => item.id));

    if (res.paymentRes) {
      toast.success('Votre paiement est en attente de validation');
      onClose();
    }
  };

  return (
    <div className="w-[24rem] flex flex-col gap-4 p-6">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6">
          <h2 className="text-4xl text-center font-semibold bg-gradient-to-b from-yellow-500 to-yellow-500/50 bg-clip-text text-transparent">
            Payment via {type === 'mvola' ? 'MVola' : 'Stripe'}
          </h2>

          <h3 className="text-xl text-center font-bold">
            Place n°: {reservations.map((item) => item.order).join(',')}
          </h3>

          <div className="flex flex-col gap-4">
            <label className="font-semibold text-center text-yellow-500 p-2 rounded-full shadow">
              Montant au total : {reservations.length * 500} Ar
            </label>
          </div>

          <PrimaryButton
            type="submit"
            label="Payer"
            isLoading={isLoading}
            className="w-full py-2.5"
          />
        </div>
      </form>
    </div>
  );
}
