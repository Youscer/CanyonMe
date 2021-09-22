import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct, Product } from 'app/product/product.model';
import { ProductService } from 'app/product/service/product.service';
import { Cart, ICart } from '../cart.model';
@Injectable({ providedIn: 'root' })
export class CartService {
  private cart: Cart;

  constructor(protected productService: ProductService) {
    this.cart = new Cart();
  }

  getCart(): ICart {
    return this.cart;
  }

  /**
   * Ajoute un produit au panier
   * @param product
   */
  addProduct(product: Product, quantity: number = 1): void {
    this.cart.changeQuantity(product, quantity, false);
  }

  /**
   * Supprime une produit du panier
   * @param productID
   */
  deleteProduct(productID: number): void {
    this.cart.deleteProduct(productID);
  }

  /**
   * Ajoute une quantité au produit
   * @param product
   * @param quantity
   */
  addQuantity(product: Product, quantity: number): void {
    this.cart.changeQuantity(product, quantity, false);
  }

  /**
   * Reduit d'une quantité au produit
   * @param product
   * @param quantity
   */
  subQuantity(product: Product, quantity: number, canDelete: boolean): void {
    this.cart.changeQuantity(product, -quantity, canDelete);
  }

  deleteAllCart(): ICart {
    return (this.cart = new Cart());
  }

  refreshCartProducts(): Observable<void> {
    return new Observable(observer => {
      let products: IProduct[] = [];
      const criteria = {
        'id.in': this.cart.items.map(cartItem => cartItem.product.id),
      };

      this.productService.query(criteria).subscribe((res: HttpResponse<IProduct[]>) => {
        products = res.body ?? [];
        this.reconstructCart(products);
        observer.next();
      });
    });
  }

  getTotalPrice(): number {
    let totalPrice = 0;
    this.cart.items.forEach(item => (totalPrice += item.product.unitPrice * item.quantity));
    return totalPrice;
  }

  getTotalQuantity(): number {
    let totalQuantity = 0;
    this.cart.items.forEach(item => (totalQuantity += item.quantity));
    return totalQuantity;
  }

  adjustQuantity(conflict: IProduct[]): string[] {
    const changes : string[] = [];
    conflict.forEach(productConflict => {
      if (productConflict.quantity > 0) {
        this.cart.changeQuantitySet(productConflict, productConflict.quantity);
        changes.push(productConflict.name + " have been reduced from your cart to " + String(productConflict.quantity));
      } else {
        this.cart.deleteProduct(productConflict.id);
        changes.push(productConflict.name + " have been removed from your cart, no more stock");
      }
    });
    return changes;
  }

  private reconstructCart(products: IProduct[]): void {
    const tempCart: Cart = new Cart();
    Object.assign(tempCart, this.cart);
    this.cart = new Cart();

    for (const product of products) {
      this.addProduct(product, tempCart.items.find(item => item.product.id === product.id)?.quantity ?? 0);
    }
  }
}
