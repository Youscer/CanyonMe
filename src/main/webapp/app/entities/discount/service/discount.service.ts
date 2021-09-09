import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDiscount, getDiscountIdentifier } from '../discount.model';

export type EntityResponseType = HttpResponse<IDiscount>;
export type EntityArrayResponseType = HttpResponse<IDiscount[]>;

@Injectable({ providedIn: 'root' })
export class DiscountService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/discounts');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(discount: IDiscount): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(discount);
    return this.http
      .post<IDiscount>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(discount: IDiscount): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(discount);
    return this.http
      .put<IDiscount>(`${this.resourceUrl}/${getDiscountIdentifier(discount) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(discount: IDiscount): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(discount);
    return this.http
      .patch<IDiscount>(`${this.resourceUrl}/${getDiscountIdentifier(discount) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IDiscount>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IDiscount[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addDiscountToCollectionIfMissing(discountCollection: IDiscount[], ...discountsToCheck: (IDiscount | null | undefined)[]): IDiscount[] {
    const discounts: IDiscount[] = discountsToCheck.filter(isPresent);
    if (discounts.length > 0) {
      const discountCollectionIdentifiers = discountCollection.map(discountItem => getDiscountIdentifier(discountItem)!);
      const discountsToAdd = discounts.filter(discountItem => {
        const discountIdentifier = getDiscountIdentifier(discountItem);
        if (discountIdentifier == null || discountCollectionIdentifiers.includes(discountIdentifier)) {
          return false;
        }
        discountCollectionIdentifiers.push(discountIdentifier);
        return true;
      });
      return [...discountsToAdd, ...discountCollection];
    }
    return discountCollection;
  }

  protected convertDateFromClient(discount: IDiscount): IDiscount {
    return Object.assign({}, discount, {
      startDate: discount.startDate?.isValid() ? discount.startDate.format(DATE_FORMAT) : undefined,
      endDate: discount.endDate?.isValid() ? discount.endDate.format(DATE_FORMAT) : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.startDate = res.body.startDate ? dayjs(res.body.startDate) : undefined;
      res.body.endDate = res.body.endDate ? dayjs(res.body.endDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((discount: IDiscount) => {
        discount.startDate = discount.startDate ? dayjs(discount.startDate) : undefined;
        discount.endDate = discount.endDate ? dayjs(discount.endDate) : undefined;
      });
    }
    return res;
  }
}
