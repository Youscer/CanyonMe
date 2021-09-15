import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as dayjs from 'dayjs';

import { DATE_FORMAT } from 'app/config/input.constants';
import { OrderState } from 'app/entities/enumerations/order-state.model';
import { IPurchasedOrder, PurchasedOrder } from '../purchased-order.model';

import { PurchasedOrderService } from './purchased-order.service';

describe('Service Tests', () => {
  describe('PurchasedOrder Service', () => {
    let service: PurchasedOrderService;
    let httpMock: HttpTestingController;
    let elemDefault: IPurchasedOrder;
    let expectedResult: IPurchasedOrder | IPurchasedOrder[] | boolean | null;
    let currentDate: dayjs.Dayjs;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(PurchasedOrderService);
      httpMock = TestBed.inject(HttpTestingController);
      currentDate = dayjs();

      elemDefault = {
        id: 0,
        orderDate: currentDate,
        orderState: OrderState.NEW,
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

      it('should create a PurchasedOrder', () => {
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

        service.create(new PurchasedOrder()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a PurchasedOrder', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            orderDate: currentDate.format(DATE_FORMAT),
            orderState: 'BBBBBB',
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

      it('should partial update a PurchasedOrder', () => {
        const patchObject = Object.assign({}, new PurchasedOrder());

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

      it('should return a list of PurchasedOrder', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            orderDate: currentDate.format(DATE_FORMAT),
            orderState: 'BBBBBB',
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

      it('should delete a PurchasedOrder', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addPurchasedOrderToCollectionIfMissing', () => {
        it('should add a PurchasedOrder to an empty array', () => {
          const purchasedOrder: IPurchasedOrder = { id: 123 };
          expectedResult = service.addPurchasedOrderToCollectionIfMissing([], purchasedOrder);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(purchasedOrder);
        });

        it('should not add a PurchasedOrder to an array that contains it', () => {
          const purchasedOrder: IPurchasedOrder = { id: 123 };
          const purchasedOrderCollection: IPurchasedOrder[] = [
            {
              ...purchasedOrder,
            },
            { id: 456 },
          ];
          expectedResult = service.addPurchasedOrderToCollectionIfMissing(purchasedOrderCollection, purchasedOrder);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a PurchasedOrder to an array that doesn't contain it", () => {
          const purchasedOrder: IPurchasedOrder = { id: 123 };
          const purchasedOrderCollection: IPurchasedOrder[] = [{ id: 456 }];
          expectedResult = service.addPurchasedOrderToCollectionIfMissing(purchasedOrderCollection, purchasedOrder);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(purchasedOrder);
        });

        it('should add only unique PurchasedOrder to an array', () => {
          const purchasedOrderArray: IPurchasedOrder[] = [{ id: 123 }, { id: 456 }, { id: 15369 }];
          const purchasedOrderCollection: IPurchasedOrder[] = [{ id: 123 }];
          expectedResult = service.addPurchasedOrderToCollectionIfMissing(purchasedOrderCollection, ...purchasedOrderArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const purchasedOrder: IPurchasedOrder = { id: 123 };
          const purchasedOrder2: IPurchasedOrder = { id: 456 };
          expectedResult = service.addPurchasedOrderToCollectionIfMissing([], purchasedOrder, purchasedOrder2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(purchasedOrder);
          expect(expectedResult).toContain(purchasedOrder2);
        });

        it('should accept null and undefined values', () => {
          const purchasedOrder: IPurchasedOrder = { id: 123 };
          expectedResult = service.addPurchasedOrderToCollectionIfMissing([], null, purchasedOrder, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(purchasedOrder);
        });

        it('should return initial array if no PurchasedOrder is added', () => {
          const purchasedOrderCollection: IPurchasedOrder[] = [{ id: 123 }];
          expectedResult = service.addPurchasedOrderToCollectionIfMissing(purchasedOrderCollection, undefined, null);
          expect(expectedResult).toEqual(purchasedOrderCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
