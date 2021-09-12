
export interface IProduct {
  id?: number;
  name?: string;
  description?: string;
  unitPrice?: number;
//  discounts?: IDiscount[] | null;
}

export class Product implements IProduct {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public unitPrice?: number,
//    public discounts?: IDiscount[] | null
  ) {}
}

export function getProductIdentifier(product: IProduct): number | undefined {
  return product.id;
}
