jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { OrderLineService } from '../service/order-line.service';
import { IOrderLine, OrderLine } from '../order-line.model';
import { IPurchasedOrder } from 'app/entities/purchased-order/purchased-order.model';
import { PurchasedOrderService } from 'app/entities/purchased-order/service/purchased-order.service';

import { OrderLineUpdateComponent } from './order-line-update.component';

describe('Component Tests', () => {
  describe('OrderLine Management Update Component', () => {
    let comp: OrderLineUpdateComponent;
    let fixture: ComponentFixture<OrderLineUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let orderLineService: OrderLineService;
    let purchasedOrderService: PurchasedOrderService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [OrderLineUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(OrderLineUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(OrderLineUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      orderLineService = TestBed.inject(OrderLineService);
      purchasedOrderService = TestBed.inject(PurchasedOrderService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call PurchasedOrder query and add missing value', () => {
        const orderLine: IOrderLine = { id: 456 };
        const order: IPurchasedOrder = { id: 35567 };
        orderLine.order = order;

        const purchasedOrderCollection: IPurchasedOrder[] = [{ id: 20729 }];
        jest.spyOn(purchasedOrderService, 'query').mockReturnValue(of(new HttpResponse({ body: purchasedOrderCollection })));
        const additionalPurchasedOrders = [order];
        const expectedCollection: IPurchasedOrder[] = [...additionalPurchasedOrders, ...purchasedOrderCollection];
        jest.spyOn(purchasedOrderService, 'addPurchasedOrderToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ orderLine });
        comp.ngOnInit();

        expect(purchasedOrderService.query).toHaveBeenCalled();
        expect(purchasedOrderService.addPurchasedOrderToCollectionIfMissing).toHaveBeenCalledWith(
          purchasedOrderCollection,
          ...additionalPurchasedOrders
        );
        expect(comp.purchasedOrdersSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const orderLine: IOrderLine = { id: 456 };
        const order: IPurchasedOrder = { id: 71748 };
        orderLine.order = order;

        activatedRoute.data = of({ orderLine });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(orderLine));
        expect(comp.purchasedOrdersSharedCollection).toContain(order);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<OrderLine>>();
        const orderLine = { id: 123 };
        jest.spyOn(orderLineService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ orderLine });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: orderLine }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(orderLineService.update).toHaveBeenCalledWith(orderLine);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<OrderLine>>();
        const orderLine = new OrderLine();
        jest.spyOn(orderLineService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ orderLine });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: orderLine }));
        saveSubject.complete();

        // THEN
        expect(orderLineService.create).toHaveBeenCalledWith(orderLine);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<OrderLine>>();
        const orderLine = { id: 123 };
        jest.spyOn(orderLineService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ orderLine });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(orderLineService.update).toHaveBeenCalledWith(orderLine);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackPurchasedOrderById', () => {
        it('Should return tracked PurchasedOrder primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackPurchasedOrderById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
