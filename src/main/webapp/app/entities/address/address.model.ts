export interface IAddress {
  id?: number;
  streetNumber?: string | null;
  street?: string;
  compliment1?: string | null;
  compliment2?: string | null;
  zipCode?: number;
  city?: string;
  state?: string | null;
  country?: string;
}

export class Address implements IAddress {
  constructor(
    public id?: number,
    public streetNumber?: string | null,
    public street?: string,
    public compliment1?: string | null,
    public compliment2?: string | null,
    public zipCode?: number,
    public city?: string,
    public state?: string | null,
    public country?: string
  ) {}
}

export function getAddressIdentifier(address: IAddress): number | undefined {
  return address.id;
}
