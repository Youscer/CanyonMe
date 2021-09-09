import { IPurchaseOrder } from 'app/entities/purchase-order/purchase-order.model';

export interface IOrderLine {
  id?: number;
  productId?: number;
  productName?: string;
  quantity?: number;
  unitPrice?: number;
  discount?: number | null;
  orderId?: IPurchaseOrder | null;
}

export class OrderLine implements IOrderLine {
  constructor(
    public id?: number,
    public productId?: number,
    public productName?: string,
    public quantity?: number,
    public unitPrice?: number,
    public discount?: number | null,
    public orderId?: IPurchaseOrder | null
  ) {}
}

export function getOrderLineIdentifier(orderLine: IOrderLine): number | undefined {
  return orderLine.id;
}
