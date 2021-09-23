package com.canyoncorp.canyonme.service.mapper;

import com.canyoncorp.canyonme.domain.*;
import com.canyoncorp.canyonme.service.dto.PersonDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Person} and its DTO {@link PersonDTO}.
 */
@Mapper(componentModel = "spring", uses = { AddressMapper.class, UserMapper.class, EmployeeMapper.class })
public interface PersonMapper extends EntityMapper<PersonDTO, Person> {
    @Mapping(target = "billingAddress", source = "billingAddress", qualifiedByName = "id")
    @Mapping(target = "shippingAddress", source = "shippingAddress", qualifiedByName = "id")
    @Mapping(target = "user", source = "user", qualifiedByName = "login")
    @Mapping(target = "employee", source = "employee", qualifiedByName = "id")
    PersonDTO toDto(Person s);

    @Named("id")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    PersonDTO toDtoId(Person person);
}
