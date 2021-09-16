jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { PurchasedOrderService } from '../service/purchased-order.service';
import { IPurchasedOrder, PurchasedOrder } from '../purchased-order.model';
import { IPerson } from 'app/entities/person/person.model';
import { PersonService } from 'app/entities/person/service/person.service';

import { PurchasedOrderUpdateComponent } from './purchased-order-update.component';

describe('Component Tests', () => {
  describe('PurchasedOrder Management Update Component', () => {
    let comp: PurchasedOrderUpdateComponent;
    let fixture: ComponentFixture<PurchasedOrderUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let purchasedOrderService: PurchasedOrderService;
    let personService: PersonService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [PurchasedOrderUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(PurchasedOrderUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PurchasedOrderUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      purchasedOrderService = TestBed.inject(PurchasedOrderService);
      personService = TestBed.inject(PersonService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call Person query and add missing value', () => {
        const purchasedOrder: IPurchasedOrder = { id: 456 };
        const person: IPerson = { id: 16989 };
        purchasedOrder.person = person;

        const personCollection: IPerson[] = [{ id: 45895 }];
        jest.spyOn(personService, 'query').mockReturnValue(of(new HttpResponse({ body: personCollection })));
        const additionalPeople = [person];
        const expectedCollection: IPerson[] = [...additionalPeople, ...personCollection];
        jest.spyOn(personService, 'addPersonToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ purchasedOrder });
        comp.ngOnInit();

        expect(personService.query).toHaveBeenCalled();
        expect(personService.addPersonToCollectionIfMissing).toHaveBeenCalledWith(personCollection, ...additionalPeople);
        expect(comp.peopleSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const purchasedOrder: IPurchasedOrder = { id: 456 };
        const person: IPerson = { id: 26019 };
        purchasedOrder.person = person;

        activatedRoute.data = of({ purchasedOrder });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(purchasedOrder));
        expect(comp.peopleSharedCollection).toContain(person);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<PurchasedOrder>>();
        const purchasedOrder = { id: 123 };
        jest.spyOn(purchasedOrderService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ purchasedOrder });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: purchasedOrder }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(purchasedOrderService.update).toHaveBeenCalledWith(purchasedOrder);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<PurchasedOrder>>();
        const purchasedOrder = new PurchasedOrder();
        jest.spyOn(purchasedOrderService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ purchasedOrder });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: purchasedOrder }));
        saveSubject.complete();

        // THEN
        expect(purchasedOrderService.create).toHaveBeenCalledWith(purchasedOrder);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<PurchasedOrder>>();
        const purchasedOrder = { id: 123 };
        jest.spyOn(purchasedOrderService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ purchasedOrder });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(purchasedOrderService.update).toHaveBeenCalledWith(purchasedOrder);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackPersonById', () => {
        it('Should return tracked Person primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackPersonById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
