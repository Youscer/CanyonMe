import * as dayjs from 'dayjs';
import { IAddress } from 'app/entities/address/address.model';
import { IUser } from 'app/entities/user/user.model';
import { IPurchasedOrder } from 'app/entities/purchased-order/purchased-order.model';
import { IEmployee } from 'app/entities/employee/employee.model';
import { Gender } from 'app/entities/enumerations/gender.model';

export interface IPerson {
  id?: number;
  firstname?: string;
  lastname?: string;
  gender?: Gender;
  birthDate?: dayjs.Dayjs;
  email?: string;
  password?: string;
  billingAddress?: IAddress | null;
  shippingAddress?: IAddress | null;
  user?: IUser | null;
  purchasedOrders?: IPurchasedOrder[] | null;
  employee?: IEmployee | null;
}

export class Person implements IPerson {
  constructor(
    public id?: number,
    public firstname?: string,
    public lastname?: string,
    public gender?: Gender,
    public birthDate?: dayjs.Dayjs,
    public email?: string,
    public password?: string,
    public billingAddress?: IAddress | null,
    public shippingAddress?: IAddress | null,
    public user?: IUser | null,
    public purchasedOrders?: IPurchasedOrder[] | null,
    public employee?: IEmployee | null
  ) {}
}

export function getPersonIdentifier(person: IPerson): number | undefined {
  return person.id;
}
