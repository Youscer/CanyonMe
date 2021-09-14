import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { Observable } from 'rxjs';
import { IProduct } from '../product.model';


export type EntityResponseType = HttpResponse<IProduct>;
export type EntityArrayResponseType = HttpResponse<IProduct[]>;

@Injectable({ providedIn: 'root' })
export class ProductService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/products');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) { }

  /**
   * Get all Product from Product API
   * @param req 
   * @returns 
   */
  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProduct[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  /**
   * Get one Product from Product API
   * @param id - id number of the product
   * @returns - Observable of the product
   */
  getProduct(id: number): Observable<IProduct> {
    const url = `${this.resourceUrl}/${id}`;
    return this.http
      .get<IProduct>(url)
    ;
  }
}
