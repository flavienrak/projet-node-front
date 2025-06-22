'use client';

import React, { Suspense } from 'react';
import Image from 'next/image';
import Popup from './Popup';
import Payment from './Payment';
import ModelComponent from './3d/ModelComponent';
import AddReservation from './AddReservation';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';

import { ArrowDown } from 'lucide-react';
import {
  getSeatsService,
  getUserReservations,
  transactionStatusService,
} from '@/services/reservation.service';
import { SeatInterface } from '@/interfaces/seat.interface';
import { PaymentType } from '@/PaymentType';
import { toast } from 'sonner';

const formatDateToday = () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); // les mois commencent à 0
  const yyyy = today.getFullYear();

  return `${dd}-${mm}-${yyyy}`;
};

export default function HomeComponent() {
  const paymentRef = React.useRef<HTMLDivElement | null>(null);

  const [seats, setSeats] = React.useState<(SeatInterface | null)[]>([]);
  const [reservation, setReservation] = React.useState<SeatInterface | null>(
    null,
  );
  const [scrollToPayment, setScrollToPayment] = React.useState(false);
  const [payment, setPayment] = React.useState<PaymentType | null>('mvola');
  const [reservations, setReservations] = React.useState<SeatInterface[]>([]);

  const blob1 = React.useRef<HTMLDivElement | null>(null);
  const blob2 = React.useRef<HTMLDivElement | null>(null);
  const blob3 = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (blob1 && blob2 && blob3) {
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;

        const moveBlob = (
          ref: React.RefObject<HTMLDivElement | null>,
          factor: number,
        ) => {
          if (ref.current) {
            const x = (clientX - window.innerWidth / 2) / factor;
            const y = (clientY - window.innerHeight / 2) / factor;
            ref.current.style.transform = `translate(${x}px, ${y}px)`;
          }
        };

        moveBlob(blob1, 20);
        moveBlob(blob2, 30);
        moveBlob(blob3, 25);
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [blob1, blob2, blob3]);

  React.useEffect(() => {
    (async () => {
      const today = formatDateToday();
      const res = await getSeatsService(today);

      if (res.seats) {
        const reversedSeats = res.seats
          .slice()
          .sort((a: SeatInterface, b: SeatInterface) => b.order - a.order);

        // Insérer des vides comme une forme de voiture (exemple : minibus 4 colonnes)
        const formattedSeats: (SeatInterface | null)[] = [
          null,
          null,
          reversedSeats[0],
          reversedSeats[1],
          reversedSeats[2],
          reversedSeats[3],
          reversedSeats[4],
          reversedSeats[5],
          reversedSeats[6],
          reversedSeats[7],
          null,
          reversedSeats[8],
          reversedSeats[9],
          reversedSeats[10],
          null,
          reversedSeats[11],
          reversedSeats[12],
          reversedSeats[13],
          reversedSeats[14],
          reversedSeats[15],
        ];

        setSeats(formattedSeats);
      }

      const reservations = await getUserReservations();

      if (reservations.seats && reservations.seats.length > 0) {
        setReservations(reservations.seats);

        const userSeats: SeatInterface[] = reservations.seats;

        if (userSeats.some((item) => !item.payment)) {
          toast.warning('Veuillez payer vos places', {
            description:
              'Le paiement sera accepté seulement avant 10h le jour du départ',
          });
          setScrollToPayment(true);
        }
      }
    })();
  }, []);

  React.useEffect(() => {
    if (scrollToPayment && paymentRef.current) {
      paymentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [scrollToPayment]);

  React.useEffect(() => {
    const pendingPayment = reservations.find(
      (item) => item.payment && item.payment.status === 'pending',
    );

    (async () => {
      if (pendingPayment && pendingPayment.payment) {
        console.log('pendingPayment:', pendingPayment);
        const res = await transactionStatusService(pendingPayment.payment.id);
        console.log('res:', res);
      }
    })();
  }, [reservations]);

  const handleReserve = async () => {};

  return (
    <div className="w-full min-h-screen bg-black flex flex-col text-white">
      <div className="min-h-screen flex justify-center items-center">
        <Canvas
          shadows
          camera={{ position: [2, -3, -3.5], fov: 50 }}
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
          }}
        >
          <ambientLight intensity={0.2} />
          <directionalLight position={[3, 5, 5]} intensity={1} castShadow />
          <Suspense fallback={'Loading'}>
            <Environment files="/hdri/night_bg.exr" background />
          </Suspense>
          <OrbitControls />
          <Environment preset="apartment" />
        </Canvas>

        <div className="h-full max-w-6xl z-10 flex flex-col items-center gap-8">
          <h1 className="text-8xl font-semibold text-center text-shadow">
            Effectuer votre réservation en ligne
          </h1>
          <a
            href="#plan"
            className="h-12 w-12 flex justify-center items-center border rounded-full shadow-lg cursor-pointer animate-bounce shadow-white border-white"
          >
            <ArrowDown />
          </a>
        </div>
      </div>
      <div id="plan" className="min-h-screen flex justify-center items-center">
        <div className="h-full max-w-6xl flex flex-col items-center gap-8">
          <h1 className="text-8xl font-semibold text-center text-shadow">
            Places disponibles
          </h1>
          <div className="grid grid-cols-4">
            {seats.map((item, index) => (
              <div
                key={`seat-${index}`}
                onClick={() => {
                  if (item) {
                    setReservation(item);
                  }
                }}
                className={`w-24 h-24 flex justify-center items-center text-4xl font-semibold hover:text-yellow-500 hover:border-yellow-500 cursor-pointer ${
                  item ? 'border border-white' : 'pointer-events-none'
                }`}
              >
                {item && item.order}
              </div>
            ))}
          </div>
          <a
            href="#3d"
            className="h-12 w-12 flex justify-center items-center border rounded-full shadow-lg cursor-pointer animate-bounce shadow-yellow-500 border-yellow-500 text-yellow-500"
          >
            <ArrowDown />
          </a>
          {reservation && (
            <Popup large onClose={() => setReservation(null)}>
              <AddReservation
                reservation={reservation}
                setScrollToPayment={setScrollToPayment}
                onClose={() => setReservation(null)}
              />
            </Popup>
          )}
        </div>
      </div>
      <div id="3d" className="min-h-screen flex justify-center items-center">
        <div className="h-full max-w-6xl flex flex-col items-center gap-8">
          <h1 className="text-8xl font-semibold text-center text-shadow">
            Vues 3D
          </h1>
          <div className="w-[40rem] h-[25rem]">
            <ModelComponent />
          </div>
          <a
            href="#paiment"
            className="h-12 w-12 flex justify-center items-center border rounded-full shadow-lg cursor-pointer animate-bounce shadow-yellow-500 border-yellow-500 text-yellow-500"
          >
            <ArrowDown />
          </a>
        </div>
      </div>
      <div
        id="paiment"
        ref={paymentRef}
        className="relative min-h-screen flex justify-center items-center"
      >
        <div className="h-full max-w-6xl flex flex-col items-center gap-8">
          <h1 className="text-8xl font-semibold text-center text-shadow">
            Paiments en ligne
          </h1>
          <div className="w-full flex gap-6">
            <div
              onClick={() => setPayment('mvola')}
              className="flex-1 flex justify-center items-center p-4 rounded-xl border border-white shadow-lg shadow-white hover:border-yellow-500 hover:shadow-yellow-500 cursor-pointer"
            >
              <Image src="/mvola.png" alt="MVola" height={10} width={100} />
            </div>
            <div
              onClick={() => setPayment('stripe')}
              className="flex-1 flex justify-center items-center p-4 rounded-xl border border-white shadow-lg shadow-white hover:border-indigo-500 hover:shadow-indigo-500 cursor-pointer"
            >
              <Image src="/stripe.png" alt="Stripe" height={6} width={100} />
            </div>
          </div>

          {payment &&
            reservations.length > 0 &&
            reservations.some((item) => !item.payment) && (
              <Popup large onClose={() => setPayment(null)}>
                <Payment
                  type={payment}
                  reservations={reservations}
                  onClose={() => setPayment(null)}
                />
              </Popup>
            )}
        </div>
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div
            ref={blob1}
            className="absolute w-[60vw] h-[60vw] bg-pink-500 rounded-full mix-blend-screen blur-[120px] opacity-30 top-1/4 left-1/4 transition-transform duration-300 ease-out"
          />
          <div
            ref={blob2}
            className="absolute w-[40vw] h-[40vw] bg-blue-500 rounded-full mix-blend-screen blur-[100px] opacity-20 top-1/2 left-1/2 transition-transform duration-300 ease-out"
          />
          <div
            ref={blob3}
            className="absolute w-[50vw] h-[50vw] bg-purple-500 rounded-full mix-blend-screen blur-[120px] opacity-20 top-1/3 left-[70%] transition-transform duration-300 ease-out"
          />
        </div>
      </div>
    </div>
  );
}
