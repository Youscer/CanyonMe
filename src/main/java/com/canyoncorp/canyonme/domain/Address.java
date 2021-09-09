package com.canyoncorp.canyonme.domain;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Address.
 */
@Entity
@Table(name = "address")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Address implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "street_number")
    private String streetNumber;

    @NotNull
    @Column(name = "street", nullable = false)
    private String street;

    @Column(name = "compliment_1")
    private String compliment1;

    @Column(name = "compliment_2")
    private String compliment2;

    @NotNull
    @Column(name = "zip_code", nullable = false)
    private Integer zipCode;

    @NotNull
    @Column(name = "city", nullable = false)
    private String city;

    @Column(name = "state")
    private String state;

    @NotNull
    @Column(name = "country", nullable = false)
    private String country;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Address id(Long id) {
        this.id = id;
        return this;
    }

    public String getStreetNumber() {
        return this.streetNumber;
    }

    public Address streetNumber(String streetNumber) {
        this.streetNumber = streetNumber;
        return this;
    }

    public void setStreetNumber(String streetNumber) {
        this.streetNumber = streetNumber;
    }

    public String getStreet() {
        return this.street;
    }

    public Address street(String street) {
        this.street = street;
        return this;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getCompliment1() {
        return this.compliment1;
    }

    public Address compliment1(String compliment1) {
        this.compliment1 = compliment1;
        return this;
    }

    public void setCompliment1(String compliment1) {
        this.compliment1 = compliment1;
    }

    public String getCompliment2() {
        return this.compliment2;
    }

    public Address compliment2(String compliment2) {
        this.compliment2 = compliment2;
        return this;
    }

    public void setCompliment2(String compliment2) {
        this.compliment2 = compliment2;
    }

    public Integer getZipCode() {
        return this.zipCode;
    }

    public Address zipCode(Integer zipCode) {
        this.zipCode = zipCode;
        return this;
    }

    public void setZipCode(Integer zipCode) {
        this.zipCode = zipCode;
    }

    public String getCity() {
        return this.city;
    }

    public Address city(String city) {
        this.city = city;
        return this;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return this.state;
    }

    public Address state(String state) {
        this.state = state;
        return this;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getCountry() {
        return this.country;
    }

    public Address country(String country) {
        this.country = country;
        return this;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Address)) {
            return false;
        }
        return id != null && id.equals(((Address) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Address{" +
            "id=" + getId() +
            ", streetNumber='" + getStreetNumber() + "'" +
            ", street='" + getStreet() + "'" +
            ", compliment1='" + getCompliment1() + "'" +
            ", compliment2='" + getCompliment2() + "'" +
            ", zipCode=" + getZipCode() +
            ", city='" + getCity() + "'" +
            ", state='" + getState() + "'" +
            ", country='" + getCountry() + "'" +
            "}";
    }
}
