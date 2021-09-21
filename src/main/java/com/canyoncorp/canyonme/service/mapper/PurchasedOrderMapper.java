package com.canyoncorp.canyonme.service.mapper;

import com.canyoncorp.canyonme.domain.*;
import com.canyoncorp.canyonme.service.dto.PurchasedOrderDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link PurchasedOrder} and its DTO {@link PurchasedOrderDTO}.
 */
@Mapper(componentModel = "spring", uses = { PersonMapper.class })
public interface PurchasedOrderMapper extends EntityMapper<PurchasedOrderDTO, PurchasedOrder> {
    @Mapping(target = "person", source = "person", qualifiedByName = "id")
    PurchasedOrderDTO toDto(PurchasedOrder s);

    @Named("id")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    PurchasedOrderDTO toDtoId(PurchasedOrder purchasedOrder);
}
