package com.canyoncorp.canyonme.service;

import com.canyoncorp.canyonme.service.dto.PictureDTO;
import com.canyoncorp.canyonme.service.dto.ProductDTO;
import java.util.List;

public interface PictureService {
    List<PictureDTO> getProductPictures(ProductDTO product);
}
