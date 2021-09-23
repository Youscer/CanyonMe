import { IImage } from './../entities/product/product.model';
export interface IProduct {
  id: number;
  name: string;
  brand: string;
  description: string;
  unitPrice: number;
  quantity: number;
  pictures?: IImage[] | null;
}

export class Product implements IProduct {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public unitPrice: number,
    public quantity: number,
    public brand: string,
    public pictures?: IImage[] | null
  ) { }
}

export function getProductIdentifier(product: IProduct): number | undefined {
  return product.id;
}
