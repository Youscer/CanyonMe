import { Product } from 'app/product/product.model';

export interface ICartItem {
  product: Product;
  quantity: number;
}

export class CartItem implements ICartItem {
  product;
  quantity;

  constructor(product: Product, quantity: number) {
    this.product = product;
    this.quantity = quantity;
  }
}

export interface ICart {
  items: CartItem[];

  deleteProduct(productID: number): void;

}

export class Cart implements ICart {
  items: CartItem[];

  constructor() {
    this.items = [];
  }

  /**
   * Supprime une produit du panier
   * @param productID
   */
  deleteProduct(productID: number): void {
    this.items = this.items.filter(ci => ci.product.id !== productID);
  }

  /**
   * Applique la quantité à l'item du panier
   * Supprime l'item si la quantité est négatif ou nul
   *
   * @param cartItem
   * @param quantity
   */
  setQuantity(cartItem: CartItem, quantity: number): void {
    if (quantity <= 0) {
      this.deleteProduct(cartItem.product.id);
    } else {
      cartItem.quantity = quantity;
    }
  }

  changeQuantity(product: Product, quantity: number): void {
    const cartItem = this.items.find(ci => ci.product.id === product.id);
    if (cartItem !== undefined) {
      const newquantity = cartItem.quantity + quantity;
      this.setQuantity(cartItem, newquantity);
    } else {
      if (quantity > 0) {
        this.items.push(new CartItem(product, quantity));
      }
    }
  }
}
