import { Product } from "app/product/product.model";


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
}

export class Cart implements ICart {
  items: CartItem[] = [];

  constructor() { }

  /**
   * Ajoute un produit au panier
   * @param product 
   */
  addProduct(product: Product, quantity : number = 1) {
    this.changeQuantity(product, quantity);
  }

  /**
   * Supprime une produit du panier
   * @param productID 
   */
  deleteProduct(productID: number) {
    this.items = this.items.filter(ci => ci.product.id !== productID);
  }

  /**
   * Ajoute une quantité au produit
   * @param product 
   * @param quantity 
   */
  addQuantity(product: Product, quantity: number) {
    this.changeQuantity(product, quantity);
  }

  /**
   * Reduit d'une quantité au produit
   * @param product 
   * @param quantity 
   */
  subQuantity(product: Product, quantity: number) {
    this.changeQuantity(product, -quantity);
  }

  /**
   * Applique la quantité à l'item du panier
   * Supprime l'item si la quantité est négatif ou nul
   * 
   * @param cartItem 
   * @param quantity 
   */
  setQuantity(cartItem: CartItem, quantity: number) {
    if (quantity <= 0) {
      this.deleteProduct(cartItem.product.id);
    } else {
      cartItem.quantity = quantity;
    }
  }

  private changeQuantity(product: Product, quantity: number) {
    let cartItem = this.items.find(ci => ci.product.id === product.id);
    if (cartItem !== undefined) {
      let newquantity = cartItem.quantity + quantity;
      this.setQuantity(cartItem, newquantity);
    } else {
      if (quantity > 0) {
        this.items.push(new CartItem(product, quantity));
      }
    }
  }





}