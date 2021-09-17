export interface IOrderResponse{
    productId : number;
    status : boolean;
    quantityLeft? : number;
}

export interface IOrderReqItem{
    productId : number;
    quantity : number;
}

export class OrderReqItem implements IOrderReqItem{
    productId : number;
    quantity : number;

    constructor(productId: number, quantity: number){
        this.productId = productId;
        this.quantity = quantity;
    }
}

export interface IOrderReq{
    items: IOrderReqItem[];
    shippingMode: string;
    paymentMode: string;
}

export class OrderReq implements IOrderReq{
    items: IOrderReqItem[];
    shippingMode: string;
    paymentMode: string;

    constructor(items: IOrderReqItem[], shippingMode: string, paymentMode: string){
        this.items = items
        this.shippingMode = shippingMode;
        this.paymentMode= paymentMode;
    }
}