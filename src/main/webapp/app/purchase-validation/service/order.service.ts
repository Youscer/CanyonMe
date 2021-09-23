import { IOrderResponse, IOrderReqItem, OrderReq, OrderReqItem } from './../order-response.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartService } from 'app/cart/services/cart.service';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { Observable } from 'rxjs';
import { ICart } from './../../cart/cart.model';


@Injectable({ providedIn: 'root' })
export class OrderService {
    protected resourceUrl = this.applicationConfigService.getEndpointFor('api/purchase');

    constructor(protected cartService: CartService, protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

    postCartOrder(cart: ICart, shippingMode: number, paymentMode: number, shippingAddress: string, billingAddress: string): Observable<IOrderResponse[]> {
        const url = `${this.resourceUrl}`;
        const items = cart.items.map<IOrderReqItem>(
            cartItem => new OrderReqItem(cartItem.product.id, cartItem.quantity)
        );

        const reqParam = new OrderReq(items, shippingMode, paymentMode, shippingAddress, billingAddress);

        return this.http.post<IOrderResponse[]>(url, reqParam);
    }

}