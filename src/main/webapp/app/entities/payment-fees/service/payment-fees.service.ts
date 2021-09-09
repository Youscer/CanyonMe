import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IPaymentFees, getPaymentFeesIdentifier } from '../payment-fees.model';

export type EntityResponseType = HttpResponse<IPaymentFees>;
export type EntityArrayResponseType = HttpResponse<IPaymentFees[]>;

@Injectable({ providedIn: 'root' })
export class PaymentFeesService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/payment-fees');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(paymentFees: IPaymentFees): Observable<EntityResponseType> {
    return this.http.post<IPaymentFees>(this.resourceUrl, paymentFees, { observe: 'response' });
  }

  update(paymentFees: IPaymentFees): Observable<EntityResponseType> {
    return this.http.put<IPaymentFees>(`${this.resourceUrl}/${getPaymentFeesIdentifier(paymentFees) as number}`, paymentFees, {
      observe: 'response',
    });
  }

  partialUpdate(paymentFees: IPaymentFees): Observable<EntityResponseType> {
    return this.http.patch<IPaymentFees>(`${this.resourceUrl}/${getPaymentFeesIdentifier(paymentFees) as number}`, paymentFees, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPaymentFees>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPaymentFees[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addPaymentFeesToCollectionIfMissing(
    paymentFeesCollection: IPaymentFees[],
    ...paymentFeesToCheck: (IPaymentFees | null | undefined)[]
  ): IPaymentFees[] {
    const paymentFees: IPaymentFees[] = paymentFeesToCheck.filter(isPresent);
    if (paymentFees.length > 0) {
      const paymentFeesCollectionIdentifiers = paymentFeesCollection.map(paymentFeesItem => getPaymentFeesIdentifier(paymentFeesItem)!);
      const paymentFeesToAdd = paymentFees.filter(paymentFeesItem => {
        const paymentFeesIdentifier = getPaymentFeesIdentifier(paymentFeesItem);
        if (paymentFeesIdentifier == null || paymentFeesCollectionIdentifiers.includes(paymentFeesIdentifier)) {
          return false;
        }
        paymentFeesCollectionIdentifiers.push(paymentFeesIdentifier);
        return true;
      });
      return [...paymentFeesToAdd, ...paymentFeesCollection];
    }
    return paymentFeesCollection;
  }
}
