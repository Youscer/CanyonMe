package com.canyoncorp.canyonme.web.rest.vm;

public class OrderLineVM {

    private Long productId;
    private Long quantity;

    public OrderLineVM() {}

    public OrderLineVM(Long productId, Long quantity) {
        this.productId = productId;
        this.quantity = quantity;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public Long getQuantity() {
        return quantity;
    }

    public void setQuantity(Long quantity) {
        this.quantity = quantity;
    }

    @Override
    public String toString() {
        return "OrderLineVM{" + "productId=" + productId + ", quantity=" + quantity + '}';
    }
}
