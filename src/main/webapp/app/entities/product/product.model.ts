import { IDiscount } from 'app/entities/discount/discount.model';

export interface IProduct {
  id?: number;
  name?: string;
  brand?: string | null;
  description?: string;
  unitPrice?: number;
  quantity?: number | null;
  discounts?: IDiscount[] | null;
}

export class Product implements IProduct {
  constructor(
    public id?: number,
    public name?: string,
    public brand?: string | null,
    public description?: string,
    public unitPrice?: number,
    public quantity?: number | null,
    public discounts?: IDiscount[] | null
  ) {}
}

export function getProductIdentifier(product: IProduct): number | undefined {
  return product.id;
}
