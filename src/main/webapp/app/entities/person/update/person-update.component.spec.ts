jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { PersonService } from '../service/person.service';
import { IPerson, Person } from '../person.model';
import { IAddress } from 'app/entities/address/address.model';
import { AddressService } from 'app/entities/address/service/address.service';

import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/user.service';
import { IEmployee } from 'app/entities/employee/employee.model';
import { EmployeeService } from 'app/entities/employee/service/employee.service';

import { PersonUpdateComponent } from './person-update.component';

describe('Component Tests', () => {
  describe('Person Management Update Component', () => {
    let comp: PersonUpdateComponent;
    let fixture: ComponentFixture<PersonUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let personService: PersonService;
    let addressService: AddressService;
    let userService: UserService;
    let employeeService: EmployeeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [PersonUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(PersonUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PersonUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      personService = TestBed.inject(PersonService);
      addressService = TestBed.inject(AddressService);
      userService = TestBed.inject(UserService);
      employeeService = TestBed.inject(EmployeeService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call billingAddress query and add missing value', () => {
        const person: IPerson = { id: 456 };
        const billingAddress: IAddress = { id: 30909 };
        person.billingAddress = billingAddress;

        const billingAddressCollection: IAddress[] = [{ id: 54865 }];
        jest.spyOn(addressService, 'query').mockReturnValue(of(new HttpResponse({ body: billingAddressCollection })));
        const expectedCollection: IAddress[] = [billingAddress, ...billingAddressCollection];
        jest.spyOn(addressService, 'addAddressToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ person });
        comp.ngOnInit();

        expect(addressService.query).toHaveBeenCalled();
        expect(addressService.addAddressToCollectionIfMissing).toHaveBeenCalledWith(billingAddressCollection, billingAddress);
        expect(comp.billingAddressesCollection).toEqual(expectedCollection);
      });

      it('Should call shippingAddress query and add missing value', () => {
        const person: IPerson = { id: 456 };
        const shippingAddress: IAddress = { id: 74193 };
        person.shippingAddress = shippingAddress;

        const shippingAddressCollection: IAddress[] = [{ id: 75708 }];
        jest.spyOn(addressService, 'query').mockReturnValue(of(new HttpResponse({ body: shippingAddressCollection })));
        const expectedCollection: IAddress[] = [shippingAddress, ...shippingAddressCollection];
        jest.spyOn(addressService, 'addAddressToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ person });
        comp.ngOnInit();

        expect(addressService.query).toHaveBeenCalled();
        expect(addressService.addAddressToCollectionIfMissing).toHaveBeenCalledWith(shippingAddressCollection, shippingAddress);
        expect(comp.shippingAddressesCollection).toEqual(expectedCollection);
      });

      it('Should call User query and add missing value', () => {
        const person: IPerson = { id: 456 };
        const user: IUser = { id: 57046 };
        person.user = user;

        const userCollection: IUser[] = [{ id: 27076 }];
        jest.spyOn(userService, 'query').mockReturnValue(of(new HttpResponse({ body: userCollection })));
        const additionalUsers = [user];
        const expectedCollection: IUser[] = [...additionalUsers, ...userCollection];
        jest.spyOn(userService, 'addUserToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ person });
        comp.ngOnInit();

        expect(userService.query).toHaveBeenCalled();
        expect(userService.addUserToCollectionIfMissing).toHaveBeenCalledWith(userCollection, ...additionalUsers);
        expect(comp.usersSharedCollection).toEqual(expectedCollection);
      });

      it('Should call Employee query and add missing value', () => {
        const person: IPerson = { id: 456 };
        const employee: IEmployee = { id: 54211 };
        person.employee = employee;

        const employeeCollection: IEmployee[] = [{ id: 72919 }];
        jest.spyOn(employeeService, 'query').mockReturnValue(of(new HttpResponse({ body: employeeCollection })));
        const additionalEmployees = [employee];
        const expectedCollection: IEmployee[] = [...additionalEmployees, ...employeeCollection];
        jest.spyOn(employeeService, 'addEmployeeToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ person });
        comp.ngOnInit();

        expect(employeeService.query).toHaveBeenCalled();
        expect(employeeService.addEmployeeToCollectionIfMissing).toHaveBeenCalledWith(employeeCollection, ...additionalEmployees);
        expect(comp.employeesSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const person: IPerson = { id: 456 };
        const billingAddress: IAddress = { id: 55139 };
        person.billingAddress = billingAddress;
        const shippingAddress: IAddress = { id: 81140 };
        person.shippingAddress = shippingAddress;
        const user: IUser = { id: 40784 };
        person.user = user;
        const employee: IEmployee = { id: 62055 };
        person.employee = employee;

        activatedRoute.data = of({ person });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(person));
        expect(comp.billingAddressesCollection).toContain(billingAddress);
        expect(comp.shippingAddressesCollection).toContain(shippingAddress);
        expect(comp.usersSharedCollection).toContain(user);
        expect(comp.employeesSharedCollection).toContain(employee);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Person>>();
        const person = { id: 123 };
        jest.spyOn(personService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ person });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: person }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(personService.update).toHaveBeenCalledWith(person);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Person>>();
        const person = new Person();
        jest.spyOn(personService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ person });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: person }));
        saveSubject.complete();

        // THEN
        expect(personService.create).toHaveBeenCalledWith(person);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Person>>();
        const person = { id: 123 };
        jest.spyOn(personService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ person });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(personService.update).toHaveBeenCalledWith(person);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackAddressById', () => {
        it('Should return tracked Address primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackAddressById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });

      describe('trackUserById', () => {
        it('Should return tracked User primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackUserById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });

      describe('trackEmployeeById', () => {
        it('Should return tracked Employee primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackEmployeeById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
