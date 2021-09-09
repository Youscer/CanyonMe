import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as dayjs from 'dayjs';

import { DATE_FORMAT } from 'app/config/input.constants';
import { OrderState } from 'app/entities/enumerations/order-state.model';
import { IPurchaseOrder, PurchaseOrder } from '../purchase-order.model';

import { PurchaseOrderService } from './purchase-order.service';

describe('Service Tests', () => {
  describe('PurchaseOrder Service', () => {
    let service: PurchaseOrderService;
    let httpMock: HttpTestingController;
    let elemDefault: IPurchaseOrder;
    let expectedResult: IPurchaseOrder | IPurchaseOrder[] | boolean | null;
    let currentDate: dayjs.Dayjs;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(PurchaseOrderService);
      httpMock = TestBed.inject(HttpTestingController);
      currentDate = dayjs();

      elemDefault = {
        id: 0,
        orderDate: currentDate,
        orderStateId: OrderState.NEW,
        shippingMode: 'AAAAAAA',
        shippingFees: 0,
        paymentMode: 'AAAAAAA',
        paymentFees: 0,
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            orderDate: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a PurchaseOrder', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            orderDate: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            orderDate: currentDate,
          },
          returnedFromService
        );

        service.create(new PurchaseOrder()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a PurchaseOrder', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            orderDate: currentDate.format(DATE_FORMAT),
            orderStateId: 'BBBBBB',
            shippingMode: 'BBBBBB',
            shippingFees: 1,
            paymentMode: 'BBBBBB',
            paymentFees: 1,
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            orderDate: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a PurchaseOrder', () => {
        const patchObject = Object.assign(
          {
            shippingMode: 'BBBBBB',
            shippingFees: 1,
            paymentMode: 'BBBBBB',
            paymentFees: 1,
          },
          new PurchaseOrder()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign(
          {
            orderDate: currentDate,
          },
          returnedFromService
        );

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of PurchaseOrder', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            orderDate: currentDate.format(DATE_FORMAT),
            orderStateId: 'BBBBBB',
            shippingMode: 'BBBBBB',
            shippingFees: 1,
            paymentMode: 'BBBBBB',
            paymentFees: 1,
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            orderDate: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a PurchaseOrder', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addPurchaseOrderToCollectionIfMissing', () => {
        it('should add a PurchaseOrder to an empty array', () => {
          const purchaseOrder: IPurchaseOrder = { id: 123 };
          expectedResult = service.addPurchaseOrderToCollectionIfMissing([], purchaseOrder);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(purchaseOrder);
        });

        it('should not add a PurchaseOrder to an array that contains it', () => {
          const purchaseOrder: IPurchaseOrder = { id: 123 };
          const purchaseOrderCollection: IPurchaseOrder[] = [
            {
              ...purchaseOrder,
            },
            { id: 456 },
          ];
          expectedResult = service.addPurchaseOrderToCollectionIfMissing(purchaseOrderCollection, purchaseOrder);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a PurchaseOrder to an array that doesn't contain it", () => {
          const purchaseOrder: IPurchaseOrder = { id: 123 };
          const purchaseOrderCollection: IPurchaseOrder[] = [{ id: 456 }];
          expectedResult = service.addPurchaseOrderToCollectionIfMissing(purchaseOrderCollection, purchaseOrder);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(purchaseOrder);
        });

        it('should add only unique PurchaseOrder to an array', () => {
          const purchaseOrderArray: IPurchaseOrder[] = [{ id: 123 }, { id: 456 }, { id: 97250 }];
          const purchaseOrderCollection: IPurchaseOrder[] = [{ id: 123 }];
          expectedResult = service.addPurchaseOrderToCollectionIfMissing(purchaseOrderCollection, ...purchaseOrderArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const purchaseOrder: IPurchaseOrder = { id: 123 };
          const purchaseOrder2: IPurchaseOrder = { id: 456 };
          expectedResult = service.addPurchaseOrderToCollectionIfMissing([], purchaseOrder, purchaseOrder2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(purchaseOrder);
          expect(expectedResult).toContain(purchaseOrder2);
        });

        it('should accept null and undefined values', () => {
          const purchaseOrder: IPurchaseOrder = { id: 123 };
          expectedResult = service.addPurchaseOrderToCollectionIfMissing([], null, purchaseOrder, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(purchaseOrder);
        });

        it('should return initial array if no PurchaseOrder is added', () => {
          const purchaseOrderCollection: IPurchaseOrder[] = [{ id: 123 }];
          expectedResult = service.addPurchaseOrderToCollectionIfMissing(purchaseOrderCollection, undefined, null);
          expect(expectedResult).toEqual(purchaseOrderCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
