package com.canyoncorp.canyonme.service.dto;

import com.canyoncorp.canyonme.domain.enumeration.OrderState;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.canyoncorp.canyonme.domain.PurchasedOrder} entity.
 */
public class PurchasedOrderDTO implements Serializable {

    @NotNull
    private Long id;

    @NotNull
    private LocalDate orderDate;

    @NotNull
    private OrderState orderState;

    private String shippingMode;

    private Float shippingFees;

    private String paymentMode;

    private Float paymentFees;

    private String shippingAddress;

    private String billingAddress;

    private PersonDTO person;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(LocalDate orderDate) {
        this.orderDate = orderDate;
    }

    public OrderState getOrderState() {
        return orderState;
    }

    public void setOrderState(OrderState orderState) {
        this.orderState = orderState;
    }

    public String getShippingMode() {
        return shippingMode;
    }

    public void setShippingMode(String shippingMode) {
        this.shippingMode = shippingMode;
    }

    public Float getShippingFees() {
        return shippingFees;
    }

    public void setShippingFees(Float shippingFees) {
        this.shippingFees = shippingFees;
    }

    public String getPaymentMode() {
        return paymentMode;
    }

    public void setPaymentMode(String paymentMode) {
        this.paymentMode = paymentMode;
    }

    public Float getPaymentFees() {
        return paymentFees;
    }

    public void setPaymentFees(Float paymentFees) {
        this.paymentFees = paymentFees;
    }

    public String getShippingAddress() {
        return shippingAddress;
    }

    public void setShippingAddress(String shippingAddress) {
        this.shippingAddress = shippingAddress;
    }

    public String getBillingAddress() {
        return billingAddress;
    }

    public void setBillingAddress(String billingAddress) {
        this.billingAddress = billingAddress;
    }

    public PersonDTO getPerson() {
        return person;
    }

    public void setPerson(PersonDTO person) {
        this.person = person;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PurchasedOrderDTO)) {
            return false;
        }

        PurchasedOrderDTO purchasedOrderDTO = (PurchasedOrderDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, purchasedOrderDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PurchasedOrderDTO{" +
            "id=" + getId() +
            ", orderDate='" + getOrderDate() + "'" +
            ", orderState='" + getOrderState() + "'" +
            ", shippingMode='" + getShippingMode() + "'" +
            ", shippingFees=" + getShippingFees() +
            ", paymentMode='" + getPaymentMode() + "'" +
            ", paymentFees=" + getPaymentFees() +
            ", shippingAddress='" + getShippingAddress() + "'" +
            ", billingAddress='" + getBillingAddress() + "'" +
            ", person=" + getPerson() +
            "}";
    }
}
