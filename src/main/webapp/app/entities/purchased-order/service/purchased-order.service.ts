import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IPurchasedOrder, getPurchasedOrderIdentifier } from '../purchased-order.model';

export type EntityResponseType = HttpResponse<IPurchasedOrder>;
export type EntityArrayResponseType = HttpResponse<IPurchasedOrder[]>;

@Injectable({ providedIn: 'root' })
export class PurchasedOrderService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/purchased-orders');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(purchasedOrder: IPurchasedOrder): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(purchasedOrder);
    return this.http
      .post<IPurchasedOrder>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(purchasedOrder: IPurchasedOrder): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(purchasedOrder);
    return this.http
      .put<IPurchasedOrder>(`${this.resourceUrl}/${getPurchasedOrderIdentifier(purchasedOrder) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(purchasedOrder: IPurchasedOrder): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(purchasedOrder);
    return this.http
      .patch<IPurchasedOrder>(`${this.resourceUrl}/${getPurchasedOrderIdentifier(purchasedOrder) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPurchasedOrder>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPurchasedOrder[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addPurchasedOrderToCollectionIfMissing(
    purchasedOrderCollection: IPurchasedOrder[],
    ...purchasedOrdersToCheck: (IPurchasedOrder | null | undefined)[]
  ): IPurchasedOrder[] {
    const purchasedOrders: IPurchasedOrder[] = purchasedOrdersToCheck.filter(isPresent);
    if (purchasedOrders.length > 0) {
      const purchasedOrderCollectionIdentifiers = purchasedOrderCollection.map(
        purchasedOrderItem => getPurchasedOrderIdentifier(purchasedOrderItem)!
      );
      const purchasedOrdersToAdd = purchasedOrders.filter(purchasedOrderItem => {
        const purchasedOrderIdentifier = getPurchasedOrderIdentifier(purchasedOrderItem);
        if (purchasedOrderIdentifier == null || purchasedOrderCollectionIdentifiers.includes(purchasedOrderIdentifier)) {
          return false;
        }
        purchasedOrderCollectionIdentifiers.push(purchasedOrderIdentifier);
        return true;
      });
      return [...purchasedOrdersToAdd, ...purchasedOrderCollection];
    }
    return purchasedOrderCollection;
  }

  protected convertDateFromClient(purchasedOrder: IPurchasedOrder): IPurchasedOrder {
    return Object.assign({}, purchasedOrder, {
      orderDate: purchasedOrder.orderDate?.isValid() ? purchasedOrder.orderDate.format(DATE_FORMAT) : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.orderDate = res.body.orderDate ? dayjs(res.body.orderDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((purchasedOrder: IPurchasedOrder) => {
        purchasedOrder.orderDate = purchasedOrder.orderDate ? dayjs(purchasedOrder.orderDate) : undefined;
      });
    }
    return res;
  }
}
