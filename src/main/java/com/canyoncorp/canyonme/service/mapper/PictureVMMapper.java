package com.canyoncorp.canyonme.service.mapper;

import com.canyoncorp.canyonme.service.dto.PictureDTO;
import com.canyoncorp.canyonme.web.rest.vm.PictureVM;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface PictureVMMapper {
    public PictureVMMapper INSTANCE = Mappers.getMapper(PictureVMMapper.class);

    @Mapping(source = "product.id", target = "productId")
    public PictureVM DTOtoVM(PictureDTO pictureDTO);
}
