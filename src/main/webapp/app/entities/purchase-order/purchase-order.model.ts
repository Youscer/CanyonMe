import * as dayjs from 'dayjs';
import { IOrderLine } from 'app/entities/order-line/order-line.model';
import { IClient } from 'app/entities/client/client.model';
import { OrderState } from 'app/entities/enumerations/order-state.model';

export interface IPurchaseOrder {
  id?: number;
  orderDate?: dayjs.Dayjs;
  orderStateId?: OrderState;
  shippingMode?: string | null;
  shippingFees?: number | null;
  paymentMode?: string | null;
  paymentFees?: number | null;
  orderLines?: IOrderLine[] | null;
  clientId?: IClient | null;
}

export class PurchaseOrder implements IPurchaseOrder {
  constructor(
    public id?: number,
    public orderDate?: dayjs.Dayjs,
    public orderStateId?: OrderState,
    public shippingMode?: string | null,
    public shippingFees?: number | null,
    public paymentMode?: string | null,
    public paymentFees?: number | null,
    public orderLines?: IOrderLine[] | null,
    public clientId?: IClient | null
  ) {}
}

export function getPurchaseOrderIdentifier(purchaseOrder: IPurchaseOrder): number | undefined {
  return purchaseOrder.id;
}
