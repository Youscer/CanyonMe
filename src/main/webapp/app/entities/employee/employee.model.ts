import { IPerson } from 'app/entities/person/person.model';
import { Role } from 'app/entities/enumerations/role.model';

export interface IEmployee {
  id?: number;
  role?: Role;
  personIds?: IPerson[] | null;
}

export class Employee implements IEmployee {
  constructor(public id?: number, public role?: Role, public personIds?: IPerson[] | null) {}
}

export function getEmployeeIdentifier(employee: IEmployee): number | undefined {
  return employee.id;
}
