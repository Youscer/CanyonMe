import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IPurchasedOrder, PurchasedOrder } from '../purchased-order.model';
import { PurchasedOrderService } from '../service/purchased-order.service';

@Injectable({ providedIn: 'root' })
export class PurchasedOrderRoutingResolveService implements Resolve<IPurchasedOrder> {
  constructor(protected service: PurchasedOrderService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPurchasedOrder> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((purchasedOrder: HttpResponse<PurchasedOrder>) => {
          if (purchasedOrder.body) {
            return of(purchasedOrder.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new PurchasedOrder());
  }
}
