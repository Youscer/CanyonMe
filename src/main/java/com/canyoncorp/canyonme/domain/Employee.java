package com.canyoncorp.canyonme.domain;

import com.canyoncorp.canyonme.domain.enumeration.Role;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Employee.
 */
@Entity
@Table(name = "employee")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Employee implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false)
    private Role role;

    @OneToMany(mappedBy = "employee")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "billingAddress", "shippingAddress", "user", "purchasedOrders", "employee" }, allowSetters = true)
    private Set<Person> people = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Employee id(Long id) {
        this.id = id;
        return this;
    }

    public Role getRole() {
        return this.role;
    }

    public Employee role(Role role) {
        this.role = role;
        return this;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public Set<Person> getPeople() {
        return this.people;
    }

    public Employee people(Set<Person> people) {
        this.setPeople(people);
        return this;
    }

    public Employee addPerson(Person person) {
        this.people.add(person);
        person.setEmployee(this);
        return this;
    }

    public Employee removePerson(Person person) {
        this.people.remove(person);
        person.setEmployee(null);
        return this;
    }

    public void setPeople(Set<Person> people) {
        if (this.people != null) {
            this.people.forEach(i -> i.setEmployee(null));
        }
        if (people != null) {
            people.forEach(i -> i.setEmployee(this));
        }
        this.people = people;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Employee)) {
            return false;
        }
        return id != null && id.equals(((Employee) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Employee{" +
            "id=" + getId() +
            ", role='" + getRole() + "'" +
            "}";
    }
}
