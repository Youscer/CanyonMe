import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IPurchaseOrder, getPurchaseOrderIdentifier } from '../purchase-order.model';

export type EntityResponseType = HttpResponse<IPurchaseOrder>;
export type EntityArrayResponseType = HttpResponse<IPurchaseOrder[]>;

@Injectable({ providedIn: 'root' })
export class PurchaseOrderService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/purchase-orders');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(purchaseOrder: IPurchaseOrder): Observable<EntityResponseType> {
    return this.http.post<IPurchaseOrder>(this.resourceUrl, purchaseOrder, { observe: 'response' });
  }

  update(purchaseOrder: IPurchaseOrder): Observable<EntityResponseType> {
    return this.http.put<IPurchaseOrder>(`${this.resourceUrl}/${getPurchaseOrderIdentifier(purchaseOrder) as number}`, purchaseOrder, {
      observe: 'response',
    });
  }

  partialUpdate(purchaseOrder: IPurchaseOrder): Observable<EntityResponseType> {
    return this.http.patch<IPurchaseOrder>(`${this.resourceUrl}/${getPurchaseOrderIdentifier(purchaseOrder) as number}`, purchaseOrder, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPurchaseOrder>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPurchaseOrder[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addPurchaseOrderToCollectionIfMissing(
    purchaseOrderCollection: IPurchaseOrder[],
    ...purchaseOrdersToCheck: (IPurchaseOrder | null | undefined)[]
  ): IPurchaseOrder[] {
    const purchaseOrders: IPurchaseOrder[] = purchaseOrdersToCheck.filter(isPresent);
    if (purchaseOrders.length > 0) {
      const purchaseOrderCollectionIdentifiers = purchaseOrderCollection.map(
        purchaseOrderItem => getPurchaseOrderIdentifier(purchaseOrderItem)!
      );
      const purchaseOrdersToAdd = purchaseOrders.filter(purchaseOrderItem => {
        const purchaseOrderIdentifier = getPurchaseOrderIdentifier(purchaseOrderItem);
        if (purchaseOrderIdentifier == null || purchaseOrderCollectionIdentifiers.includes(purchaseOrderIdentifier)) {
          return false;
        }
        purchaseOrderCollectionIdentifiers.push(purchaseOrderIdentifier);
        return true;
      });
      return [...purchaseOrdersToAdd, ...purchaseOrderCollection];
    }
    return purchaseOrderCollection;
  }
}
