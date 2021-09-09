import { IClient } from 'app/entities/client/client.model';
import { IEmployee } from 'app/entities/employee/employee.model';
import { Gender } from 'app/entities/enumerations/gender.model';

export interface IPerson {
  id?: number;
  firstname?: string;
  lastname?: string;
  genderId?: Gender;
  email?: string;
  password?: string;
  client?: IClient | null;
  employee?: IEmployee | null;
}

export class Person implements IPerson {
  constructor(
    public id?: number,
    public firstname?: string,
    public lastname?: string,
    public genderId?: Gender,
    public email?: string,
    public password?: string,
    public client?: IClient | null,
    public employee?: IEmployee | null
  ) {}
}

export function getPersonIdentifier(person: IPerson): number | undefined {
  return person.id;
}
