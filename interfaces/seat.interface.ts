import { PaymentInterface } from './payment.interface';

export interface SeatInterface {
  id: number;
  order: number;
  date: string;
  userId: number;

  createdAt: Date;
  updatedAt: Date;

  payment?: PaymentInterface;
}
