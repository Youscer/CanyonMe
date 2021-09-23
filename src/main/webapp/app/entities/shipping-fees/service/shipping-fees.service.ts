import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IShippingFees, getShippingFeesIdentifier } from '../shipping-fees.model';

export type EntityResponseType = HttpResponse<IShippingFees>;
export type EntityArrayResponseType = HttpResponse<IShippingFees[]>;

@Injectable({ providedIn: 'root' })
export class ShippingFeesService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/shipping-fees');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(shippingFees: IShippingFees): Observable<EntityResponseType> {
    return this.http.post<IShippingFees>(this.resourceUrl, shippingFees, { observe: 'response' });
  }

  update(shippingFees: IShippingFees): Observable<EntityResponseType> {
    return this.http.put<IShippingFees>(`${this.resourceUrl}/${getShippingFeesIdentifier(shippingFees) as number}`, shippingFees, {
      observe: 'response',
    });
  }

  partialUpdate(shippingFees: IShippingFees): Observable<EntityResponseType> {
    return this.http.patch<IShippingFees>(`${this.resourceUrl}/${getShippingFeesIdentifier(shippingFees) as number}`, shippingFees, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IShippingFees>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IShippingFees[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addShippingFeesToCollectionIfMissing(
    shippingFeesCollection: IShippingFees[],
    ...shippingFeesToCheck: (IShippingFees | null | undefined)[]
  ): IShippingFees[] {
    const shippingFees: IShippingFees[] = shippingFeesToCheck.filter(isPresent);
    if (shippingFees.length > 0) {
      const shippingFeesCollectionIdentifiers = shippingFeesCollection.map(
        shippingFeesItem => getShippingFeesIdentifier(shippingFeesItem)!
      );
      const shippingFeesToAdd = shippingFees.filter(shippingFeesItem => {
        const shippingFeesIdentifier = getShippingFeesIdentifier(shippingFeesItem);
        if (shippingFeesIdentifier == null || shippingFeesCollectionIdentifiers.includes(shippingFeesIdentifier)) {
          return false;
        }
        shippingFeesCollectionIdentifiers.push(shippingFeesIdentifier);
        return true;
      });
      return [...shippingFeesToAdd, ...shippingFeesCollection];
    }
    return shippingFeesCollection;
  }
}
