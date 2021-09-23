import { ShippingMode } from 'app/entities/enumerations/shipping-mode.model';

export interface IShippingFees {
  id?: number;
  shippingMode?: ShippingMode;
  fees?: number;
}

export class ShippingFees implements IShippingFees {
  constructor(public id?: number, public shippingMode?: ShippingMode, public fees?: number) {}
}

export function getShippingFeesIdentifier(shippingFees: IShippingFees): number | undefined {
  return shippingFees.id;
}
