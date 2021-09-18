package com.canyoncorp.canyonme.service.dto;

import java.io.Serializable;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.canyoncorp.canyonme.domain.OrderLine} entity.
 */
public class OrderLineDTO implements Serializable {

    //    @NotNull
    private Long id;

    @NotNull
    private Long product;

    @NotNull
    private String productName;

    @NotNull
    private Long quantity;

    @NotNull
    private Float unitPrice;

    private Float discount;

    private PurchasedOrderDTO order;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getProduct() {
        return product;
    }

    public void setProduct(Long product) {
        this.product = product;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public Long getQuantity() {
        return quantity;
    }

    public void setQuantity(Long quantity) {
        this.quantity = quantity;
    }

    public Float getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(Float unitPrice) {
        this.unitPrice = unitPrice;
    }

    public Float getDiscount() {
        return discount;
    }

    public void setDiscount(Float discount) {
        this.discount = discount;
    }

    public PurchasedOrderDTO getOrder() {
        return order;
    }

    public void setOrder(PurchasedOrderDTO order) {
        this.order = order;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof OrderLineDTO)) {
            return false;
        }

        OrderLineDTO orderLineDTO = (OrderLineDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, orderLineDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "OrderLineDTO{" +
            "id=" + getId() +
            ", product=" + getProduct() +
            ", productName='" + getProductName() + "'" +
            ", quantity=" + getQuantity() +
            ", unitPrice=" + getUnitPrice() +
            ", discount=" + getDiscount() +
            ", order=" + getOrder() +
            "}";
    }
}
