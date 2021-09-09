package com.canyoncorp.canyonme.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A OrderLine.
 */
@Entity
@Table(name = "order_line")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class OrderLine implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "quantity", nullable = false)
    private Long quantity;

    @NotNull
    @Column(name = "unit_price", nullable = false)
    private Float unitPrice;

    @ManyToOne
    @JsonIgnoreProperties(value = { "orderLines", "clientId" }, allowSetters = true)
    private PurchaseOrder orderId;

    @ManyToOne
    @JsonIgnoreProperties(value = { "orderLines" }, allowSetters = true)
    private Product productId;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public OrderLine id(Long id) {
        this.id = id;
        return this;
    }

    public Long getQuantity() {
        return this.quantity;
    }

    public OrderLine quantity(Long quantity) {
        this.quantity = quantity;
        return this;
    }

    public void setQuantity(Long quantity) {
        this.quantity = quantity;
    }

    public Float getUnitPrice() {
        return this.unitPrice;
    }

    public OrderLine unitPrice(Float unitPrice) {
        this.unitPrice = unitPrice;
        return this;
    }

    public void setUnitPrice(Float unitPrice) {
        this.unitPrice = unitPrice;
    }

    public PurchaseOrder getOrderId() {
        return this.orderId;
    }

    public OrderLine orderId(PurchaseOrder purchaseOrder) {
        this.setOrderId(purchaseOrder);
        return this;
    }

    public void setOrderId(PurchaseOrder purchaseOrder) {
        this.orderId = purchaseOrder;
    }

    public Product getProductId() {
        return this.productId;
    }

    public OrderLine productId(Product product) {
        this.setProductId(product);
        return this;
    }

    public void setProductId(Product product) {
        this.productId = product;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof OrderLine)) {
            return false;
        }
        return id != null && id.equals(((OrderLine) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "OrderLine{" +
            "id=" + getId() +
            ", quantity=" + getQuantity() +
            ", unitPrice=" + getUnitPrice() +
            "}";
    }
}
