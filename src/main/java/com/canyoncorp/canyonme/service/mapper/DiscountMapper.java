package com.canyoncorp.canyonme.service.mapper;

import com.canyoncorp.canyonme.domain.*;
import com.canyoncorp.canyonme.service.dto.DiscountDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Discount} and its DTO {@link DiscountDTO}.
 */
@Mapper(componentModel = "spring", uses = { ProductMapper.class })
public interface DiscountMapper extends EntityMapper<DiscountDTO, Discount> {
    @Mapping(target = "product", source = "product", qualifiedByName = "id")
    DiscountDTO toDto(Discount s);
}
