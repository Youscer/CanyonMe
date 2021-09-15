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

  addProduct(product: Product, quantity : number): void;
  deleteProduct(productID: number): void;
  addQuantity(product: Product, quantity: number): void;
  subQuantity(product: Product, quantity: number): void;
  changeQuantity(product: Product, quantity: number): void;
}

export class Cart implements ICart {
  items: CartItem[];

  constructor() {
    this.items = [];
  }

  /**
   * Ajoute un produit au panier
   * @param product
   */
  addProduct(product: Product, quantity: number = 1): void {
    this.changeQuantity(product, quantity);
  }

  /**
   * Supprime une produit du panier
   * @param productID
   */
  deleteProduct(productID: number): void {
    this.items = this.items.filter(ci => ci.product.id !== productID);
  }

  /**
   * Ajoute une quantité au produit
   * @param product
   * @param quantity
   */
  addQuantity(product: Product, quantity: number): void {
    this.changeQuantity(product, quantity);
  }

  /**
   * Reduit d'une quantité au produit
   * @param product
   * @param quantity
   */
  subQuantity(product: Product, quantity: number): void {
    this.changeQuantity(product, -quantity);
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
