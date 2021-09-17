package com.canyoncorp.canyonme.service.mapper;

import com.canyoncorp.canyonme.domain.*;
import com.canyoncorp.canyonme.service.dto.OrderLineDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link OrderLine} and its DTO {@link OrderLineDTO}.
 */
@Mapper(componentModel = "spring", uses = { PurchasedOrderMapper.class })
public interface OrderLineMapper extends EntityMapper<OrderLineDTO, OrderLine> {
    @Mapping(target = "order", source = "order", qualifiedByName = "id")
    OrderLineDTO toDto(OrderLine s);
}
