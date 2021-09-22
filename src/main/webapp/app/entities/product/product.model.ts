import { IDiscount } from 'app/entities/discount/discount.model';

export interface IImage {
  id?: number | null;
  productId?: number | null;
  link?: string;
}

export interface IProduct {
  id?: number;
  name?: string;
  brand?: string | null;
  description?: string;
  unitPrice?: number;
  quantity?: number | null;
  pictures?: IImage[] | null;
  discounts?: IDiscount[] | null;
}

export class Image implements IImage {
  constructor(public id?: number, public productId?: number, public link?: string) {}
}

export class Product implements IProduct {
  constructor(
    public id?: number,
    public name?: string,
    public brand?: string | null,
    public description?: string,
    public unitPrice?: number,
    public quantity?: number | null,
    public pictures?: IImage[] | null,
    public discounts?: IDiscount[] | null
  ) {}
}

export function getProductIdentifier(product: IProduct): number | undefined {
  return product.id;
}
