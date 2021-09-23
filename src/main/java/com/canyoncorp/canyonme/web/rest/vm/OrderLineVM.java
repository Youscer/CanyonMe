package com.canyoncorp.canyonme.web.rest.vm;

import com.canyoncorp.canyonme.service.dto.OrderLineDTO;

public class OrderLineVM {

    private Long productId;
    private Long quantity;

    public OrderLineVM() {}

    public OrderLineVM(Long productId, Long quantity) {
        this.productId = productId;
        this.quantity = quantity;
    }

    public OrderLineDTO toOrderLineDTO() {
        OrderLineDTO orderLineDTO = new OrderLineDTO();
        orderLineDTO.setQuantity(quantity);
        orderLineDTO.setProduct(productId);
        return orderLineDTO;
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
