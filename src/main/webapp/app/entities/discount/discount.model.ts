import * as dayjs from 'dayjs';
import { IProduct } from 'app/entities/product/product.model';

export interface IDiscount {
  id?: number;
  rate?: number;
  startDate?: dayjs.Dayjs | null;
  endDate?: dayjs.Dayjs | null;
  product?: IProduct | null;
}

export class Discount implements IDiscount {
  constructor(
    public id?: number,
    public rate?: number,
    public startDate?: dayjs.Dayjs | null,
    public endDate?: dayjs.Dayjs | null,
    public product?: IProduct | null
  ) {}
}

export function getDiscountIdentifier(discount: IDiscount): number | undefined {
  return discount.id;
}
