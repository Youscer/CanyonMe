package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.mycompany.myapp.domain.enumeration.DeliveryMode;
import com.mycompany.myapp.domain.enumeration.OrderState;
import com.mycompany.myapp.domain.enumeration.PaymentMode;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A PurchaseOrder.
 */
@Entity
@Table(name = "purchase_order")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class PurchaseOrder implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "billing_address", nullable = false)
    private String billingAddress;

    @NotNull
    @Column(name = "shipping_address", nullable = false)
    private String shippingAddress;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "order_state_id", nullable = false)
    private OrderState orderStateId;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "delivery_mode_id", nullable = false)
    private DeliveryMode deliveryModeId;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "payment_mode_id", nullable = false)
    private PaymentMode paymentModeId;

    @OneToMany(mappedBy = "orderId")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "orderId", "productId" }, allowSetters = true)
    private Set<OrderLine> orderLines = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "purchaseOrders" }, allowSetters = true)
    private Client clientId;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public PurchaseOrder id(Long id) {
        this.id = id;
        return this;
    }

    public String getBillingAddress() {
        return this.billingAddress;
    }

    public PurchaseOrder billingAddress(String billingAddress) {
        this.billingAddress = billingAddress;
        return this;
    }

    public void setBillingAddress(String billingAddress) {
        this.billingAddress = billingAddress;
    }

    public String getShippingAddress() {
        return this.shippingAddress;
    }

    public PurchaseOrder shippingAddress(String shippingAddress) {
        this.shippingAddress = shippingAddress;
        return this;
    }

    public void setShippingAddress(String shippingAddress) {
        this.shippingAddress = shippingAddress;
    }

    public OrderState getOrderStateId() {
        return this.orderStateId;
    }

    public PurchaseOrder orderStateId(OrderState orderStateId) {
        this.orderStateId = orderStateId;
        return this;
    }

    public void setOrderStateId(OrderState orderStateId) {
        this.orderStateId = orderStateId;
    }

    public DeliveryMode getDeliveryModeId() {
        return this.deliveryModeId;
    }

    public PurchaseOrder deliveryModeId(DeliveryMode deliveryModeId) {
        this.deliveryModeId = deliveryModeId;
        return this;
    }

    public void setDeliveryModeId(DeliveryMode deliveryModeId) {
        this.deliveryModeId = deliveryModeId;
    }

    public PaymentMode getPaymentModeId() {
        return this.paymentModeId;
    }

    public PurchaseOrder paymentModeId(PaymentMode paymentModeId) {
        this.paymentModeId = paymentModeId;
        return this;
    }

    public void setPaymentModeId(PaymentMode paymentModeId) {
        this.paymentModeId = paymentModeId;
    }

    public Set<OrderLine> getOrderLines() {
        return this.orderLines;
    }

    public PurchaseOrder orderLines(Set<OrderLine> orderLines) {
        this.setOrderLines(orderLines);
        return this;
    }

    public PurchaseOrder addOrderLine(OrderLine orderLine) {
        this.orderLines.add(orderLine);
        orderLine.setOrderId(this);
        return this;
    }

    public PurchaseOrder removeOrderLine(OrderLine orderLine) {
        this.orderLines.remove(orderLine);
        orderLine.setOrderId(null);
        return this;
    }

    public void setOrderLines(Set<OrderLine> orderLines) {
        if (this.orderLines != null) {
            this.orderLines.forEach(i -> i.setOrderId(null));
        }
        if (orderLines != null) {
            orderLines.forEach(i -> i.setOrderId(this));
        }
        this.orderLines = orderLines;
    }

    public Client getClientId() {
        return this.clientId;
    }

    public PurchaseOrder clientId(Client client) {
        this.setClientId(client);
        return this;
    }

    public void setClientId(Client client) {
        this.clientId = client;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PurchaseOrder)) {
            return false;
        }
        return id != null && id.equals(((PurchaseOrder) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PurchaseOrder{" +
            "id=" + getId() +
            ", billingAddress='" + getBillingAddress() + "'" +
            ", shippingAddress='" + getShippingAddress() + "'" +
            ", orderStateId='" + getOrderStateId() + "'" +
            ", deliveryModeId='" + getDeliveryModeId() + "'" +
            ", paymentModeId='" + getPaymentModeId() + "'" +
            "}";
    }
}
