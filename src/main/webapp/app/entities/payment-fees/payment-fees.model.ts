import { PaymentMode } from 'app/entities/enumerations/payment-mode.model';

export interface IPaymentFees {
  id?: number;
  paymentMode?: PaymentMode;
  fees?: number;
}

export class PaymentFees implements IPaymentFees {
  constructor(public id?: number, public paymentMode?: PaymentMode, public fees?: number) {}
}

export function getPaymentFeesIdentifier(paymentFees: IPaymentFees): number | undefined {
  return paymentFees.id;
}
