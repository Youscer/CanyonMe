import { IPurchaseOrder } from 'app/entities/purchase-order/purchase-order.model';
import { Gender } from 'app/entities/enumerations/gender.model';

export interface IClient {
  id?: number;
  firstname?: string;
  lastname?: string;
  genderId?: Gender;
  streetAddress?: string;
  birthDate?: string;
  email?: string;
  password?: string;
  purchaseOrders?: IPurchaseOrder[] | null;
}

export class Client implements IClient {
  constructor(
    public id?: number,
    public firstname?: string,
    public lastname?: string,
    public genderId?: Gender,
    public streetAddress?: string,
    public birthDate?: string,
    public email?: string,
    public password?: string,
    public purchaseOrders?: IPurchaseOrder[] | null
  ) {}
}

export function getClientIdentifier(client: IClient): number | undefined {
  return client.id;
}
