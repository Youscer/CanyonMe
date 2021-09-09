package com.canyoncorp.canyonme.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Client.
 */
@Entity
@Table(name = "client")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Client implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "birth_date", nullable = false)
    private String birthDate;

    @OneToOne
    @JoinColumn(unique = true)
    private Address billingAddress;

    @OneToOne
    @JoinColumn(unique = true)
    private Address shippingAddress;

    @OneToMany(mappedBy = "client")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "client", "employee" }, allowSetters = true)
    private Set<Person> personIds = new HashSet<>();

    @OneToMany(mappedBy = "clientId")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "orderLines", "clientId" }, allowSetters = true)
    private Set<PurchaseOrder> purchaseOrders = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Client id(Long id) {
        this.id = id;
        return this;
    }

    public String getBirthDate() {
        return this.birthDate;
    }

    public Client birthDate(String birthDate) {
        this.birthDate = birthDate;
        return this;
    }

    public void setBirthDate(String birthDate) {
        this.birthDate = birthDate;
    }

    public Address getBillingAddress() {
        return this.billingAddress;
    }

    public Client billingAddress(Address address) {
        this.setBillingAddress(address);
        return this;
    }

    public void setBillingAddress(Address address) {
        this.billingAddress = address;
    }

    public Address getShippingAddress() {
        return this.shippingAddress;
    }

    public Client shippingAddress(Address address) {
        this.setShippingAddress(address);
        return this;
    }

    public void setShippingAddress(Address address) {
        this.shippingAddress = address;
    }

    public Set<Person> getPersonIds() {
        return this.personIds;
    }

    public Client personIds(Set<Person> people) {
        this.setPersonIds(people);
        return this;
    }

    public Client addPersonId(Person person) {
        this.personIds.add(person);
        person.setClient(this);
        return this;
    }

    public Client removePersonId(Person person) {
        this.personIds.remove(person);
        person.setClient(null);
        return this;
    }

    public void setPersonIds(Set<Person> people) {
        if (this.personIds != null) {
            this.personIds.forEach(i -> i.setClient(null));
        }
        if (people != null) {
            people.forEach(i -> i.setClient(this));
        }
        this.personIds = people;
    }

    public Set<PurchaseOrder> getPurchaseOrders() {
        return this.purchaseOrders;
    }

    public Client purchaseOrders(Set<PurchaseOrder> purchaseOrders) {
        this.setPurchaseOrders(purchaseOrders);
        return this;
    }

    public Client addPurchaseOrder(PurchaseOrder purchaseOrder) {
        this.purchaseOrders.add(purchaseOrder);
        purchaseOrder.setClientId(this);
        return this;
    }

    public Client removePurchaseOrder(PurchaseOrder purchaseOrder) {
        this.purchaseOrders.remove(purchaseOrder);
        purchaseOrder.setClientId(null);
        return this;
    }

    public void setPurchaseOrders(Set<PurchaseOrder> purchaseOrders) {
        if (this.purchaseOrders != null) {
            this.purchaseOrders.forEach(i -> i.setClientId(null));
        }
        if (purchaseOrders != null) {
            purchaseOrders.forEach(i -> i.setClientId(this));
        }
        this.purchaseOrders = purchaseOrders;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Client)) {
            return false;
        }
        return id != null && id.equals(((Client) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Client{" +
            "id=" + getId() +
            ", birthDate='" + getBirthDate() + "'" +
            "}";
    }
}
