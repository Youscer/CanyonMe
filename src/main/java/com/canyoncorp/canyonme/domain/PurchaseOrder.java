package com.canyoncorp.canyonme.domain;

import com.canyoncorp.canyonme.domain.enumeration.OrderState;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.LocalDate;
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
    @Column(name = "order_date", nullable = false)
    private LocalDate orderDate;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "order_state_id", nullable = false)
    private OrderState orderStateId;

    @Column(name = "shipping_mode")
    private String shippingMode;

    @Column(name = "shipping_fees")
    private Float shippingFees;

    @Column(name = "payment_mode")
    private String paymentMode;

    @Column(name = "payment_fees")
    private Float paymentFees;

    @OneToMany(mappedBy = "orderId")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "orderId" }, allowSetters = true)
    private Set<OrderLine> orderLines = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "billingAddress", "shippingAddress", "personIds", "purchaseOrders" }, allowSetters = true)
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

    public LocalDate getOrderDate() {
        return this.orderDate;
    }

    public PurchaseOrder orderDate(LocalDate orderDate) {
        this.orderDate = orderDate;
        return this;
    }

    public void setOrderDate(LocalDate orderDate) {
        this.orderDate = orderDate;
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

    public String getShippingMode() {
        return this.shippingMode;
    }

    public PurchaseOrder shippingMode(String shippingMode) {
        this.shippingMode = shippingMode;
        return this;
    }

    public void setShippingMode(String shippingMode) {
        this.shippingMode = shippingMode;
    }

    public Float getShippingFees() {
        return this.shippingFees;
    }

    public PurchaseOrder shippingFees(Float shippingFees) {
        this.shippingFees = shippingFees;
        return this;
    }

    public void setShippingFees(Float shippingFees) {
        this.shippingFees = shippingFees;
    }

    public String getPaymentMode() {
        return this.paymentMode;
    }

    public PurchaseOrder paymentMode(String paymentMode) {
        this.paymentMode = paymentMode;
        return this;
    }

    public void setPaymentMode(String paymentMode) {
        this.paymentMode = paymentMode;
    }

    public Float getPaymentFees() {
        return this.paymentFees;
    }

    public PurchaseOrder paymentFees(Float paymentFees) {
        this.paymentFees = paymentFees;
        return this;
    }

    public void setPaymentFees(Float paymentFees) {
        this.paymentFees = paymentFees;
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
            ", orderDate='" + getOrderDate() + "'" +
            ", orderStateId='" + getOrderStateId() + "'" +
            ", shippingMode='" + getShippingMode() + "'" +
            ", shippingFees=" + getShippingFees() +
            ", paymentMode='" + getPaymentMode() + "'" +
            ", paymentFees=" + getPaymentFees() +
            "}";
    }
}
