package com.canyoncorp.canyonme.service;

import com.canyoncorp.canyonme.service.dto.PictureDTO;
import com.canyoncorp.canyonme.service.dto.ProductDTO;
import com.canyoncorp.canyonme.web.rest.vm.PictureVM;
import java.util.List;

public interface PictureService {
    List<PictureDTO> getProductPictures(ProductDTO product);

    PictureDTO creatPicture(PictureVM pictureVM);
}
