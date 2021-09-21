package com.canyoncorp.canyonme.service.impl;

import com.canyoncorp.canyonme.domain.Picture;
import com.canyoncorp.canyonme.domain.Product;
import com.canyoncorp.canyonme.repository.PictureRepository;
import com.canyoncorp.canyonme.repository.ProductRepository;
import com.canyoncorp.canyonme.service.PictureService;
import com.canyoncorp.canyonme.service.ProductService;
import com.canyoncorp.canyonme.service.dto.PictureDTO;
import com.canyoncorp.canyonme.service.dto.ProductDTO;
import com.canyoncorp.canyonme.service.mapper.PictureMapper;
import com.canyoncorp.canyonme.web.rest.vm.PictureVM;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class PictureServiceImpl implements PictureService {

    private final Logger log = LoggerFactory.getLogger(PictureServiceImpl.class);
    private PictureRepository pictureRepository;
    private PictureMapper pictureMapper;

    public PictureServiceImpl(PictureRepository pictureRepository, PictureMapper pictureMapper) {
        this.pictureRepository = pictureRepository;
        this.pictureMapper = pictureMapper;
    }

    @Transactional(readOnly = true)
    public List<PictureDTO> getProductPictures(ProductDTO product) {
        return pictureMapper.toDto(pictureRepository.findByProduct(product.getId()));
    }

    public PictureDTO creatPicture(PictureVM pictureVM, ProductDTO productDTO) {
        // filling DTO
        PictureDTO pictureDTO = new PictureDTO();
        pictureDTO.setLink(pictureVM.getLink());
        pictureDTO.setProduct(productDTO);

        // inserting data
        Picture picture = pictureRepository.save(pictureMapper.toEntity(pictureDTO));
        return pictureMapper.toDto(picture);
    }
}
