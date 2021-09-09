import { IProduct } from 'app/entities/product/product.model';

export interface IPicture {
  id?: number;
  link?: string;
  productId?: IProduct | null;
}

export class Picture implements IPicture {
  constructor(public id?: number, public link?: string, public productId?: IProduct | null) {}
}

export function getPictureIdentifier(picture: IPicture): number | undefined {
  return picture.id;
}
