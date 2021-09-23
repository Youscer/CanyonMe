package com.canyoncorp.canyonme.domain;

import com.canyoncorp.canyonme.domain.enumeration.PaymentMode;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A PaymentFees.
 */
@Entity
@Table(name = "payment_fees")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class PaymentFees implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "payment_mode", nullable = false)
    private PaymentMode paymentMode;

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

    public PaymentFees id(Long id) {
        this.id = id;
        return this;
    }

    public PaymentMode getPaymentMode() {
        return this.paymentMode;
    }

    public PaymentFees paymentMode(PaymentMode paymentMode) {
        this.paymentMode = paymentMode;
        return this;
    }

    public void setPaymentMode(PaymentMode paymentMode) {
        this.paymentMode = paymentMode;
    }

    public Float getFees() {
        return this.fees;
    }

    public PaymentFees fees(Float fees) {
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
        if (!(o instanceof PaymentFees)) {
            return false;
        }
        return id != null && id.equals(((PaymentFees) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PaymentFees{" +
            "id=" + getId() +
            ", paymentMode='" + getPaymentMode() + "'" +
            ", fees=" + getFees() +
            "}";
    }
}
