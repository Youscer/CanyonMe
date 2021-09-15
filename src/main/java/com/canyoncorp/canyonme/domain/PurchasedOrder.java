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
 * A PurchasedOrder.
 */
@Entity
@Table(name = "purchased_order")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class PurchasedOrder implements Serializable {

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
    @Column(name = "order_state", nullable = false)
    private OrderState orderState;

    @Column(name = "shipping_mode")
    private String shippingMode;

    @Column(name = "shipping_fees")
    private Float shippingFees;

    @Column(name = "payment_mode")
    private String paymentMode;

    @Column(name = "payment_fees")
    private Float paymentFees;

    @OneToMany(mappedBy = "order")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "order" }, allowSetters = true)
    private Set<OrderLine> orderLines = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "billingAddress", "shippingAddress", "user", "purchasedOrders", "employee" }, allowSetters = true)
    private Person person;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public PurchasedOrder id(Long id) {
        this.id = id;
        return this;
    }

    public LocalDate getOrderDate() {
        return this.orderDate;
    }

    public PurchasedOrder orderDate(LocalDate orderDate) {
        this.orderDate = orderDate;
        return this;
    }

    public void setOrderDate(LocalDate orderDate) {
        this.orderDate = orderDate;
    }

    public OrderState getOrderState() {
        return this.orderState;
    }

    public PurchasedOrder orderState(OrderState orderState) {
        this.orderState = orderState;
        return this;
    }

    public void setOrderState(OrderState orderState) {
        this.orderState = orderState;
    }

    public String getShippingMode() {
        return this.shippingMode;
    }

    public PurchasedOrder shippingMode(String shippingMode) {
        this.shippingMode = shippingMode;
        return this;
    }

    public void setShippingMode(String shippingMode) {
        this.shippingMode = shippingMode;
    }

    public Float getShippingFees() {
        return this.shippingFees;
    }

    public PurchasedOrder shippingFees(Float shippingFees) {
        this.shippingFees = shippingFees;
        return this;
    }

    public void setShippingFees(Float shippingFees) {
        this.shippingFees = shippingFees;
    }

    public String getPaymentMode() {
        return this.paymentMode;
    }

    public PurchasedOrder paymentMode(String paymentMode) {
        this.paymentMode = paymentMode;
        return this;
    }

    public void setPaymentMode(String paymentMode) {
        this.paymentMode = paymentMode;
    }

    public Float getPaymentFees() {
        return this.paymentFees;
    }

    public PurchasedOrder paymentFees(Float paymentFees) {
        this.paymentFees = paymentFees;
        return this;
    }

    public void setPaymentFees(Float paymentFees) {
        this.paymentFees = paymentFees;
    }

    public Set<OrderLine> getOrderLines() {
        return this.orderLines;
    }

    public PurchasedOrder orderLines(Set<OrderLine> orderLines) {
        this.setOrderLines(orderLines);
        return this;
    }

    public PurchasedOrder addOrderLine(OrderLine orderLine) {
        this.orderLines.add(orderLine);
        orderLine.setOrder(this);
        return this;
    }

    public PurchasedOrder removeOrderLine(OrderLine orderLine) {
        this.orderLines.remove(orderLine);
        orderLine.setOrder(null);
        return this;
    }

    public void setOrderLines(Set<OrderLine> orderLines) {
        if (this.orderLines != null) {
            this.orderLines.forEach(i -> i.setOrder(null));
        }
        if (orderLines != null) {
            orderLines.forEach(i -> i.setOrder(this));
        }
        this.orderLines = orderLines;
    }

    public Person getPerson() {
        return this.person;
    }

    public PurchasedOrder person(Person person) {
        this.setPerson(person);
        return this;
    }

    public void setPerson(Person person) {
        this.person = person;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PurchasedOrder)) {
            return false;
        }
        return id != null && id.equals(((PurchasedOrder) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PurchasedOrder{" +
            "id=" + getId() +
            ", orderDate='" + getOrderDate() + "'" +
            ", orderState='" + getOrderState() + "'" +
            ", shippingMode='" + getShippingMode() + "'" +
            ", shippingFees=" + getShippingFees() +
            ", paymentMode='" + getPaymentMode() + "'" +
            ", paymentFees=" + getPaymentFees() +
            "}";
    }
}
