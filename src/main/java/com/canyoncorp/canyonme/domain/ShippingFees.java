package com.canyoncorp.canyonme.domain;

import com.canyoncorp.canyonme.domain.enumeration.ShippingMode;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A ShippingFees.
 */
@Entity
@Table(name = "shipping_fees")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class ShippingFees implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "shipping_mode", nullable = false)
    private ShippingMode shippingMode;

    @NotNull
    @Column(name = "fees", nullable = false)
    private Float fees;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ShippingFees id(Long id) {
        this.id = id;
        return this;
    }

    public ShippingMode getShippingMode() {
        return this.shippingMode;
    }

    public ShippingFees shippingMode(ShippingMode shippingMode) {
        this.shippingMode = shippingMode;
        return this;
    }

    public void setShippingMode(ShippingMode shippingMode) {
        this.shippingMode = shippingMode;
    }

    public Float getFees() {
        return this.fees;
    }

    public ShippingFees fees(Float fees) {
        this.fees = fees;
        return this;
    }

    public void setFees(Float fees) {
        this.fees = fees;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ShippingFees)) {
            return false;
        }
        return id != null && id.equals(((ShippingFees) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ShippingFees{" +
            "id=" + getId() +
            ", shippingMode='" + getShippingMode() + "'" +
            ", fees=" + getFees() +
            "}";
    }
}
