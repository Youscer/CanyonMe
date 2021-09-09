import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IPaymentFees, PaymentFees } from '../payment-fees.model';
import { PaymentFeesService } from '../service/payment-fees.service';

@Injectable({ providedIn: 'root' })
export class PaymentFeesRoutingResolveService implements Resolve<IPaymentFees> {
  constructor(protected service: PaymentFeesService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPaymentFees> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((paymentFees: HttpResponse<PaymentFees>) => {
          if (paymentFees.body) {
            return of(paymentFees.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new PaymentFees());
  }
}
