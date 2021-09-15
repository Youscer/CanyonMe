import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from 'app/product/product.model';
import { ProductService } from 'app/product/service/product.service';
import { Cart, ICart } from '../cart.model';
@Injectable({ providedIn: 'root' })
export class CartService {

    private cart: Cart;

    constructor(protected productService: ProductService) {
        this.cart = new Cart();
    }

    getCart() : ICart{
        return this.cart;
    }

    refreshCartProducts(): Observable<void> {
        return new Observable(
            observer => {
                let products: IProduct[] = [];
                const criteria = {
                    'id.in': this.cart.items.map(cartItem => cartItem.product.id)
                };
        
                this.productService.query(criteria).subscribe(
                    (res: HttpResponse<IProduct[]>) => {
                        products = res.body ?? [];
                        this.reconstructCart(products);
                        observer.next();
                    },
                );
            }
        );
    }

    private reconstructCart(products: IProduct[]) : void{
        const tempCart: Cart = new Cart();
        Object.assign(tempCart, this.cart);
        this.cart = new Cart();

        for (const product of products) {
            this.cart.addProduct(product, tempCart.items.find(item => item.product.id === product.id)?.quantity ?? 0);
        }
    }

}
