package com.canyoncorp.canyonme.service.mapper;

import com.canyoncorp.canyonme.domain.*;
import com.canyoncorp.canyonme.service.dto.PictureDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Picture} and its DTO {@link PictureDTO}.
 */
@Mapper(componentModel = "spring", uses = { ProductMapper.class })
public interface PictureMapper extends EntityMapper<PictureDTO, Picture> {
    // @Mapping(target = "product", source = "product", qualifiedByName = "id")
    PictureDTO toDto(Picture s);
}
