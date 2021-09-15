import { IProduct } from 'app/entities/product/product.model';

export interface IPicture {
  id?: number;
  link?: string;
  product?: IProduct | null;
}

export class Picture implements IPicture {
  constructor(public id?: number, public link?: string, public product?: IProduct | null) {}
}

export function getPictureIdentifier(picture: IPicture): number | undefined {
  return picture.id;
}
