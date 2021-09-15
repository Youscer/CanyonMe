import * as dayjs from 'dayjs';
import { IOrderLine } from 'app/entities/order-line/order-line.model';
import { IPerson } from 'app/entities/person/person.model';
import { OrderState } from 'app/entities/enumerations/order-state.model';

export interface IPurchasedOrder {
  id?: number;
  orderDate?: dayjs.Dayjs;
  orderState?: OrderState;
  shippingMode?: string | null;
  shippingFees?: number | null;
  paymentMode?: string | null;
  paymentFees?: number | null;
  orderLines?: IOrderLine[] | null;
  person?: IPerson | null;
}

export class PurchasedOrder implements IPurchasedOrder {
  constructor(
    public id?: number,
    public orderDate?: dayjs.Dayjs,
    public orderState?: OrderState,
    public shippingMode?: string | null,
    public shippingFees?: number | null,
    public paymentMode?: string | null,
    public paymentFees?: number | null,
    public orderLines?: IOrderLine[] | null,
    public person?: IPerson | null
  ) {}
}

export function getPurchasedOrderIdentifier(purchasedOrder: IPurchasedOrder): number | undefined {
  return purchasedOrder.id;
}
