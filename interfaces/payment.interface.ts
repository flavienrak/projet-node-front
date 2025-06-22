export interface PaymentInterface {
  id: number;
  amount: number;
  status: string;
  seatId: number;

  transactionRef: string;
  correlationId: string;

  createdAt: Date;
  updatedAt: Date;
}
