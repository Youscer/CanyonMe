export interface IOrderResponse {
    productId: number;
    status: boolean;
    quantityLeft?: number;
}

export interface IOrderReqItem {
    productId: number;
    quantity: number;
}

export class OrderReqItem implements IOrderReqItem {
    productId: number;
    quantity: number;

    constructor(productId: number, quantity: number) {
        this.productId = productId;
        this.quantity = quantity;
    }
}

export interface IOrderReq {
    orderLines: IOrderReqItem[];
    shippingFeesId: number;
    paymentFeesId: number;
    shippingAddress: string;
    billingAddress: string;
}

export class OrderReq implements IOrderReq {

    constructor(
        public orderLines: IOrderReqItem[],
        public shippingFeesId: number,
        public paymentFeesId: number,
        public shippingAddress: string,
        public billingAddress: string,
    ) {
    }
}