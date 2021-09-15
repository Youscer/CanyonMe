export interface IProduct {
  id: number;
  name: string;
  description: string;
  unitPrice: number;
}

export class Product implements IProduct {
  constructor(public id: number, public name: string, public description: string, public unitPrice: number) {}
}

export function getProductIdentifier(product: IProduct): number | undefined {
  return product.id;
}
