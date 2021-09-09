jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { OrderLineService } from '../service/order-line.service';
import { IOrderLine, OrderLine } from '../order-line.model';
import { IPurchaseOrder } from 'app/entities/purchase-order/purchase-order.model';
import { PurchaseOrderService } from 'app/entities/purchase-order/service/purchase-order.service';
import { IProduct } from 'app/entities/product/product.model';
import { ProductService } from 'app/entities/product/service/product.service';

import { OrderLineUpdateComponent } from './order-line-update.component';

describe('Component Tests', () => {
  describe('OrderLine Management Update Component', () => {
    let comp: OrderLineUpdateComponent;
    let fixture: ComponentFixture<OrderLineUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let orderLineService: OrderLineService;
    let purchaseOrderService: PurchaseOrderService;
    let productService: ProductService;

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
      purchaseOrderService = TestBed.inject(PurchaseOrderService);
      productService = TestBed.inject(ProductService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call PurchaseOrder query and add missing value', () => {
        const orderLine: IOrderLine = { id: 456 };
        const orderId: IPurchaseOrder = { id: 78688 };
        orderLine.orderId = orderId;

        const purchaseOrderCollection: IPurchaseOrder[] = [{ id: 33668 }];
        jest.spyOn(purchaseOrderService, 'query').mockReturnValue(of(new HttpResponse({ body: purchaseOrderCollection })));
        const additionalPurchaseOrders = [orderId];
        const expectedCollection: IPurchaseOrder[] = [...additionalPurchaseOrders, ...purchaseOrderCollection];
        jest.spyOn(purchaseOrderService, 'addPurchaseOrderToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ orderLine });
        comp.ngOnInit();

        expect(purchaseOrderService.query).toHaveBeenCalled();
        expect(purchaseOrderService.addPurchaseOrderToCollectionIfMissing).toHaveBeenCalledWith(
          purchaseOrderCollection,
          ...additionalPurchaseOrders
        );
        expect(comp.purchaseOrdersSharedCollection).toEqual(expectedCollection);
      });

      it('Should call Product query and add missing value', () => {
        const orderLine: IOrderLine = { id: 456 };
        const productId: IProduct = { id: 63374 };
        orderLine.productId = productId;

        const productCollection: IProduct[] = [{ id: 30020 }];
        jest.spyOn(productService, 'query').mockReturnValue(of(new HttpResponse({ body: productCollection })));
        const additionalProducts = [productId];
        const expectedCollection: IProduct[] = [...additionalProducts, ...productCollection];
        jest.spyOn(productService, 'addProductToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ orderLine });
        comp.ngOnInit();

        expect(productService.query).toHaveBeenCalled();
        expect(productService.addProductToCollectionIfMissing).toHaveBeenCalledWith(productCollection, ...additionalProducts);
        expect(comp.productsSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const orderLine: IOrderLine = { id: 456 };
        const orderId: IPurchaseOrder = { id: 86151 };
        orderLine.orderId = orderId;
        const productId: IProduct = { id: 19186 };
        orderLine.productId = productId;

        activatedRoute.data = of({ orderLine });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(orderLine));
        expect(comp.purchaseOrdersSharedCollection).toContain(orderId);
        expect(comp.productsSharedCollection).toContain(productId);
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
      describe('trackPurchaseOrderById', () => {
        it('Should return tracked PurchaseOrder primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackPurchaseOrderById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });

      describe('trackProductById', () => {
        it('Should return tracked Product primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackProductById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
