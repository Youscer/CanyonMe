import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from 'app/product/product.model';
import { ProductService } from 'app/product/service/product.service';
import { Cart } from '../cart.model';
@Injectable({ providedIn: 'root' })
export class CartService {

    private cart: Cart;

    constructor(protected productService: ProductService) {
        this.cart = new Cart();
    }

    getCart() {
        return this.cart;
    }

    refreshCartProducts(): Promise<any> {
        return new Promise<void>(
            (resolve, reject) => {
                if (true) {
                    resolve();
                } else {
                    reject()
                }
            }
        );
        let promise = new Promise(resolve => this.getProductsAndConstruct());
        return promise;
    }

    private getProductsAndConstruct() {
        let products: IProduct[] = [];
        let criteria = {
            'id.in': this.cart.items.map(cartItem => cartItem.product.id)
        };

        this.productService.query(criteria).subscribe(
            (res: HttpResponse<IProduct[]>) => {
                products = res.body ?? [];
                this.reconstructCart(products);
            },
        );
    }

    private reconstructCart(products: IProduct[]) {
        let tempCart: Cart = new Cart();
        Object.assign(tempCart, this.cart);
        this.cart = new Cart();

        for (let product of products) {
            this.cart.addProduct(product, tempCart.items.find(item => item.product.id == product.id)?.quantity ?? 0);
        }
    }

}
