import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IShippingFees, ShippingFees } from '../shipping-fees.model';
import { ShippingFeesService } from '../service/shipping-fees.service';

@Injectable({ providedIn: 'root' })
export class ShippingFeesRoutingResolveService implements Resolve<IShippingFees> {
  constructor(protected service: ShippingFeesService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IShippingFees> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((shippingFees: HttpResponse<ShippingFees>) => {
          if (shippingFees.body) {
            return of(shippingFees.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ShippingFees());
  }
}
