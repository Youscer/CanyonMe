import { IOrderLine } from 'app/entities/order-line/order-line.model';

export interface IProduct {
  id?: number;
  name?: string;
  description?: string;
  unitPrice?: number;
  orderLines?: IOrderLine[] | null;
}

export class Product implements IProduct {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public unitPrice?: number,
    public orderLines?: IOrderLine[] | null
  ) {}
}

export function getProductIdentifier(product: IProduct): number | undefined {
  return product.id;
}
