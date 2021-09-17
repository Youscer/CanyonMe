package com.canyoncorp.canyonme.domain;

import com.canyoncorp.canyonme.domain.enumeration.Gender;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Person.
 */
@Entity
@Table(name = "person")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Person implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "firstname", nullable = false)
    private String firstname;

    @NotNull
    @Column(name = "lastname", nullable = false)
    private String lastname;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "gender", nullable = false)
    private Gender gender;

    @NotNull
    @Column(name = "birth_date", nullable = false)
    private Instant birthDate;

    @NotNull
    @Column(name = "email", nullable = false)
    private String email;

    @NotNull
    @Column(name = "password", nullable = false)
    private String password;

    @OneToOne
    @JoinColumn(unique = true)
    private Address billingAddress;

    @OneToOne
    @JoinColumn(unique = true)
    private Address shippingAddress;

    @OneToOne
    @JoinColumn(unique = true)
    private User user;

    @OneToMany(mappedBy = "person")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "orderLines", "person" }, allowSetters = true)
    private Set<PurchasedOrder> purchasedOrders = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "people" }, allowSetters = true)
    private Employee employee;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Person id(Long id) {
        this.id = id;
        return this;
    }

    public String getFirstname() {
        return this.firstname;
    }

    public Person firstname(String firstname) {
        this.firstname = firstname;
        return this;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return this.lastname;
    }

    public Person lastname(String lastname) {
        this.lastname = lastname;
        return this;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public Gender getGender() {
        return this.gender;
    }

    public Person gender(Gender gender) {
        this.gender = gender;
        return this;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public Instant getBirthDate() {
        return this.birthDate;
    }

    public Person birthDate(Instant birthDate) {
        this.birthDate = birthDate;
        return this;
    }

    public void setBirthDate(Instant birthDate) {
        this.birthDate = birthDate;
    }

    public String getEmail() {
        return this.email;
    }

    public Person email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return this.password;
    }

    public Person password(String password) {
        this.password = password;
        return this;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Address getBillingAddress() {
        return this.billingAddress;
    }

    public Person billingAddress(Address address) {
        this.setBillingAddress(address);
        return this;
    }

    public void setBillingAddress(Address address) {
        this.billingAddress = address;
    }

    public Address getShippingAddress() {
        return this.shippingAddress;
    }

    public Person shippingAddress(Address address) {
        this.setShippingAddress(address);
        return this;
    }

    public void setShippingAddress(Address address) {
        this.shippingAddress = address;
    }

    public User getUser() {
        return this.user;
    }

    public Person user(User user) {
        this.setUser(user);
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<PurchasedOrder> getPurchasedOrders() {
        return this.purchasedOrders;
    }

    public Person purchasedOrders(Set<PurchasedOrder> purchasedOrders) {
        this.setPurchasedOrders(purchasedOrders);
        return this;
    }

    public Person addPurchasedOrder(PurchasedOrder purchasedOrder) {
        this.purchasedOrders.add(purchasedOrder);
        purchasedOrder.setPerson(this);
        return this;
    }

    public Person removePurchasedOrder(PurchasedOrder purchasedOrder) {
        this.purchasedOrders.remove(purchasedOrder);
        purchasedOrder.setPerson(null);
        return this;
    }

    public void setPurchasedOrders(Set<PurchasedOrder> purchasedOrders) {
        if (this.purchasedOrders != null) {
            this.purchasedOrders.forEach(i -> i.setPerson(null));
        }
        if (purchasedOrders != null) {
            purchasedOrders.forEach(i -> i.setPerson(this));
        }
        this.purchasedOrders = purchasedOrders;
    }

    public Employee getEmployee() {
        return this.employee;
    }

    public Person employee(Employee employee) {
        this.setEmployee(employee);
        return this;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Person)) {
            return false;
        }
        return id != null && id.equals(((Person) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Person{" +
            "id=" + getId() +
            ", firstname='" + getFirstname() + "'" +
            ", lastname='" + getLastname() + "'" +
            ", gender='" + getGender() + "'" +
            ", birthDate='" + getBirthDate() + "'" +
            ", email='" + getEmail() + "'" +
            ", password='" + getPassword() + "'" +
            "}";
    }
}
