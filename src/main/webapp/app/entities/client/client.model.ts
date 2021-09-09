import { IAddress } from 'app/entities/address/address.model';
import { IPerson } from 'app/entities/person/person.model';
import { IPurchaseOrder } from 'app/entities/purchase-order/purchase-order.model';

export interface IClient {
  id?: number;
  birthDate?: string;
  billingAddress?: IAddress | null;
  shippingAddress?: IAddress | null;
  personIds?: IPerson[] | null;
  purchaseOrders?: IPurchaseOrder[] | null;
}

export class Client implements IClient {
  constructor(
    public id?: number,
    public birthDate?: string,
    public billingAddress?: IAddress | null,
    public shippingAddress?: IAddress | null,
    public personIds?: IPerson[] | null,
    public purchaseOrders?: IPurchaseOrder[] | null
  ) {}
}

export function getClientIdentifier(client: IClient): number | undefined {
  return client.id;
}
