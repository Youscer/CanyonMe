import { IPurchasedOrder } from 'app/entities/purchased-order/purchased-order.model';

export interface IOrderLine {
  id?: number;
  product?: number;
  productName?: string;
  quantity?: number;
  unitPrice?: number;
  discount?: number | null;
  order?: IPurchasedOrder | null;
}

export class OrderLine implements IOrderLine {
  constructor(
    public id?: number,
    public product?: number,
    public productName?: string,
    public quantity?: number,
    public unitPrice?: number,
    public discount?: number | null,
    public order?: IPurchasedOrder | null
  ) {}
}

export function getOrderLineIdentifier(orderLine: IOrderLine): number | undefined {
  return orderLine.id;
}
