jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IPurchasedOrder, PurchasedOrder } from '../purchased-order.model';
import { PurchasedOrderService } from '../service/purchased-order.service';

import { PurchasedOrderRoutingResolveService } from './purchased-order-routing-resolve.service';

describe('Service Tests', () => {
  describe('PurchasedOrder routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: PurchasedOrderRoutingResolveService;
    let service: PurchasedOrderService;
    let resultPurchasedOrder: IPurchasedOrder | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(PurchasedOrderRoutingResolveService);
      service = TestBed.inject(PurchasedOrderService);
      resultPurchasedOrder = undefined;
    });

    describe('resolve', () => {
      it('should return IPurchasedOrder returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultPurchasedOrder = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultPurchasedOrder).toEqual({ id: 123 });
      });

      it('should return new IPurchasedOrder if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultPurchasedOrder = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultPurchasedOrder).toEqual(new PurchasedOrder());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as PurchasedOrder })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultPurchasedOrder = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultPurchasedOrder).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
