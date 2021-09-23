jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IDiscount, Discount } from '../discount.model';
import { DiscountService } from '../service/discount.service';

import { DiscountRoutingResolveService } from './discount-routing-resolve.service';

describe('Service Tests', () => {
  describe('Discount routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: DiscountRoutingResolveService;
    let service: DiscountService;
    let resultDiscount: IDiscount | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(DiscountRoutingResolveService);
      service = TestBed.inject(DiscountService);
      resultDiscount = undefined;
    });

    describe('resolve', () => {
      it('should return IDiscount returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultDiscount = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultDiscount).toEqual({ id: 123 });
      });

      it('should return new IDiscount if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultDiscount = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultDiscount).toEqual(new Discount());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as Discount })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultDiscount = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultDiscount).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
