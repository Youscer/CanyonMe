import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ShippingMode } from 'app/entities/enumerations/shipping-mode.model';
import { IShippingFees, ShippingFees } from '../shipping-fees.model';

import { ShippingFeesService } from './shipping-fees.service';

describe('Service Tests', () => {
  describe('ShippingFees Service', () => {
    let service: ShippingFeesService;
    let httpMock: HttpTestingController;
    let elemDefault: IShippingFees;
    let expectedResult: IShippingFees | IShippingFees[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(ShippingFeesService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        shippingMode: ShippingMode.DHL,
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

      it('should create a ShippingFees', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new ShippingFees()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a ShippingFees', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            shippingMode: 'BBBBBB',
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

      it('should partial update a ShippingFees', () => {
        const patchObject = Object.assign(
          {
            shippingMode: 'BBBBBB',
          },
          new ShippingFees()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of ShippingFees', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            shippingMode: 'BBBBBB',
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

      it('should delete a ShippingFees', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addShippingFeesToCollectionIfMissing', () => {
        it('should add a ShippingFees to an empty array', () => {
          const shippingFees: IShippingFees = { id: 123 };
          expectedResult = service.addShippingFeesToCollectionIfMissing([], shippingFees);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(shippingFees);
        });

        it('should not add a ShippingFees to an array that contains it', () => {
          const shippingFees: IShippingFees = { id: 123 };
          const shippingFeesCollection: IShippingFees[] = [
            {
              ...shippingFees,
            },
            { id: 456 },
          ];
          expectedResult = service.addShippingFeesToCollectionIfMissing(shippingFeesCollection, shippingFees);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a ShippingFees to an array that doesn't contain it", () => {
          const shippingFees: IShippingFees = { id: 123 };
          const shippingFeesCollection: IShippingFees[] = [{ id: 456 }];
          expectedResult = service.addShippingFeesToCollectionIfMissing(shippingFeesCollection, shippingFees);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(shippingFees);
        });

        it('should add only unique ShippingFees to an array', () => {
          const shippingFeesArray: IShippingFees[] = [{ id: 123 }, { id: 456 }, { id: 26333 }];
          const shippingFeesCollection: IShippingFees[] = [{ id: 123 }];
          expectedResult = service.addShippingFeesToCollectionIfMissing(shippingFeesCollection, ...shippingFeesArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const shippingFees: IShippingFees = { id: 123 };
          const shippingFees2: IShippingFees = { id: 456 };
          expectedResult = service.addShippingFeesToCollectionIfMissing([], shippingFees, shippingFees2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(shippingFees);
          expect(expectedResult).toContain(shippingFees2);
        });

        it('should accept null and undefined values', () => {
          const shippingFees: IShippingFees = { id: 123 };
          expectedResult = service.addShippingFeesToCollectionIfMissing([], null, shippingFees, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(shippingFees);
        });

        it('should return initial array if no ShippingFees is added', () => {
          const shippingFeesCollection: IShippingFees[] = [{ id: 123 }];
          expectedResult = service.addShippingFeesToCollectionIfMissing(shippingFeesCollection, undefined, null);
          expect(expectedResult).toEqual(shippingFeesCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
