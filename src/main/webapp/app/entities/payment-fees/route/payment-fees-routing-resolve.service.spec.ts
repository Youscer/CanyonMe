jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IPaymentFees, PaymentFees } from '../payment-fees.model';
import { PaymentFeesService } from '../service/payment-fees.service';

import { PaymentFeesRoutingResolveService } from './payment-fees-routing-resolve.service';

describe('Service Tests', () => {
  describe('PaymentFees routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: PaymentFeesRoutingResolveService;
    let service: PaymentFeesService;
    let resultPaymentFees: IPaymentFees | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(PaymentFeesRoutingResolveService);
      service = TestBed.inject(PaymentFeesService);
      resultPaymentFees = undefined;
    });

    describe('resolve', () => {
      it('should return IPaymentFees returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultPaymentFees = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultPaymentFees).toEqual({ id: 123 });
      });

      it('should return new IPaymentFees if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultPaymentFees = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultPaymentFees).toEqual(new PaymentFees());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as PaymentFees })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultPaymentFees = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultPaymentFees).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
