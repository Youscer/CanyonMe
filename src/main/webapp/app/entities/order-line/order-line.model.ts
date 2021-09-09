import { IPurchaseOrder } from 'app/entities/purchase-order/purchase-order.model';
import { IProduct } from 'app/entities/product/product.model';

export interface IOrderLine {
  id?: number;
  quantity?: number;
  unitPrice?: number;
  orderId?: IPurchaseOrder | null;
  productId?: IProduct | null;
}

export class OrderLine implements IOrderLine {
  constructor(
    public id?: number,
    public quantity?: number,
    public unitPrice?: number,
    public orderId?: IPurchaseOrder | null,
    public productId?: IProduct | null
  ) {}
}

export function getOrderLineIdentifier(orderLine: IOrderLine): number | undefined {
  return orderLine.id;
}
