import { IOrderLine } from 'app/entities/order-line/order-line.model';
import { IClient } from 'app/entities/client/client.model';
import { OrderState } from 'app/entities/enumerations/order-state.model';
import { DeliveryMode } from 'app/entities/enumerations/delivery-mode.model';
import { PaymentMode } from 'app/entities/enumerations/payment-mode.model';

export interface IPurchaseOrder {
  id?: number;
  billingAddress?: string;
  shippingAddress?: string;
  orderStateId?: OrderState;
  deliveryModeId?: DeliveryMode;
  paymentModeId?: PaymentMode;
  orderLines?: IOrderLine[] | null;
  clientId?: IClient | null;
}

export class PurchaseOrder implements IPurchaseOrder {
  constructor(
    public id?: number,
    public billingAddress?: string,
    public shippingAddress?: string,
    public orderStateId?: OrderState,
    public deliveryModeId?: DeliveryMode,
    public paymentModeId?: PaymentMode,
    public orderLines?: IOrderLine[] | null,
    public clientId?: IClient | null
  ) {}
}

export function getPurchaseOrderIdentifier(purchaseOrder: IPurchaseOrder): number | undefined {
  return purchaseOrder.id;
}
