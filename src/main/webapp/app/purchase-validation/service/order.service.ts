import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartService } from 'app/cart/services/cart.service';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { Observable } from 'rxjs';
import { IOrderResponse } from '../order-response.model';


@Injectable({ providedIn: 'root' })
export class OrderService {
    protected resourceUrl = this.applicationConfigService.getEndpointFor('api/order');

    constructor(protected cartService: CartService, protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {
    }

    postCartOrder(): Observable<IOrderResponse[]> {
        const url = `${this.resourceUrl}`;
        const reqParam = this.cartService.getCart().items.map(
            cartItem => {
                return {
                    productId: cartItem.product.id,
                    quantity: cartItem.quantity
                }
            });

        return this.http.post<IOrderResponse[]>(url, reqParam);
    }

}