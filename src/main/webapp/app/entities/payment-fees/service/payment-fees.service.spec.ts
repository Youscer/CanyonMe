import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { PaymentMode } from 'app/entities/enumerations/payment-mode.model';
import { IPaymentFees, PaymentFees } from '../payment-fees.model';

import { PaymentFeesService } from './payment-fees.service';

describe('Service Tests', () => {
  describe('PaymentFees Service', () => {
    let service: PaymentFeesService;
    let httpMock: HttpTestingController;
    let elemDefault: IPaymentFees;
    let expectedResult: IPaymentFees | IPaymentFees[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(PaymentFeesService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        paymentMode: PaymentMode.YES_CARD,
        fees: 0,
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a PaymentFees', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new PaymentFees()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a PaymentFees', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            paymentMode: 'BBBBBB',
            fees: 1,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a PaymentFees', () => {
        const patchObject = Object.assign(
          {
            fees: 1,
          },
          new PaymentFees()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of PaymentFees', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            paymentMode: 'BBBBBB',
            fees: 1,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a PaymentFees', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addPaymentFeesToCollectionIfMissing', () => {
        it('should add a PaymentFees to an empty array', () => {
          const paymentFees: IPaymentFees = { id: 123 };
          expectedResult = service.addPaymentFeesToCollectionIfMissing([], paymentFees);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(paymentFees);
        });

        it('should not add a PaymentFees to an array that contains it', () => {
          const paymentFees: IPaymentFees = { id: 123 };
          const paymentFeesCollection: IPaymentFees[] = [
            {
              ...paymentFees,
            },
            { id: 456 },
          ];
          expectedResult = service.addPaymentFeesToCollectionIfMissing(paymentFeesCollection, paymentFees);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a PaymentFees to an array that doesn't contain it", () => {
          const paymentFees: IPaymentFees = { id: 123 };
          const paymentFeesCollection: IPaymentFees[] = [{ id: 456 }];
          expectedResult = service.addPaymentFeesToCollectionIfMissing(paymentFeesCollection, paymentFees);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(paymentFees);
        });

        it('should add only unique PaymentFees to an array', () => {
          const paymentFeesArray: IPaymentFees[] = [{ id: 123 }, { id: 456 }, { id: 59759 }];
          const paymentFeesCollection: IPaymentFees[] = [{ id: 123 }];
          expectedResult = service.addPaymentFeesToCollectionIfMissing(paymentFeesCollection, ...paymentFeesArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const paymentFees: IPaymentFees = { id: 123 };
          const paymentFees2: IPaymentFees = { id: 456 };
          expectedResult = service.addPaymentFeesToCollectionIfMissing([], paymentFees, paymentFees2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(paymentFees);
          expect(expectedResult).toContain(paymentFees2);
        });

        it('should accept null and undefined values', () => {
          const paymentFees: IPaymentFees = { id: 123 };
          expectedResult = service.addPaymentFeesToCollectionIfMissing([], null, paymentFees, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(paymentFees);
        });

        it('should return initial array if no PaymentFees is added', () => {
          const paymentFeesCollection: IPaymentFees[] = [{ id: 123 }];
          expectedResult = service.addPaymentFeesToCollectionIfMissing(paymentFeesCollection, undefined, null);
          expect(expectedResult).toEqual(paymentFeesCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
