jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IShippingFees, ShippingFees } from '../shipping-fees.model';
import { ShippingFeesService } from '../service/shipping-fees.service';

import { ShippingFeesRoutingResolveService } from './shipping-fees-routing-resolve.service';

describe('Service Tests', () => {
  describe('ShippingFees routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: ShippingFeesRoutingResolveService;
    let service: ShippingFeesService;
    let resultShippingFees: IShippingFees | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(ShippingFeesRoutingResolveService);
      service = TestBed.inject(ShippingFeesService);
      resultShippingFees = undefined;
    });

    describe('resolve', () => {
      it('should return IShippingFees returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultShippingFees = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultShippingFees).toEqual({ id: 123 });
      });

      it('should return new IShippingFees if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultShippingFees = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultShippingFees).toEqual(new ShippingFees());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as ShippingFees })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultShippingFees = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultShippingFees).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
