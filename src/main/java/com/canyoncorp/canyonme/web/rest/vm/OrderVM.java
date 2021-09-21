package com.canyoncorp.canyonme.web.rest.vm;

import com.canyoncorp.canyonme.domain.enumeration.PaymentMode;
import com.canyoncorp.canyonme.domain.enumeration.ShippingMode;
import java.util.ArrayList;
import java.util.List;

public class OrderVM {

    private List<OrderLineVM> orderLines;
    private String billingAddress;
    private String shippingAddress;
    private Long shippingFeesId;
    private Long paymentFeesId;

    /*
    private ShippingMode shippingMode;
    private PaymentMode paymentMode;
     */

    public OrderVM() {}

    public List<OrderLineVM> getOrderLines() {
        return orderLines;
    }

    public void setOrderLines(List<OrderLineVM> orderLines) {
        this.orderLines = orderLines;
    }

    public String getBillingAddress() {
        return billingAddress;
    }

    public void setBillingAddress(String billingAddress) {
        this.billingAddress = billingAddress;
    }

    public String getShippingAddress() {
        return shippingAddress;
    }

    public void setShippingAddress(String shippingAddress) {
        this.shippingAddress = shippingAddress;
    }

    public Long getShippingFeesId() {
        return shippingFeesId;
    }

    public void setShippingFeesId(Long shippingFeesId) {
        this.shippingFeesId = shippingFeesId;
    }

    public Long getPaymentFeesId() {
        return paymentFeesId;
    }

    public void setPaymentFeesId(Long paymentFeesId) {
        this.paymentFeesId = paymentFeesId;
    }
    /*

    public ShippingMode getShippingMode() {
        return shippingMode;
    }

    public void setShippingMode(String shippingMode) {
        this.shippingMode = ShippingMode.valueOf(shippingMode.toUpperCase());
    }

    public PaymentMode getPaymentMode() {
        return paymentMode;
    }

    public void setPaymentMode(String paymentMode) {
        this.paymentMode = PaymentMode.valueOf(paymentMode.toUpperCase());
    }
     */
}
