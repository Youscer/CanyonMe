package com.canyoncorp.canyonme.service;

import com.canyoncorp.canyonme.domain.Product;
import com.canyoncorp.canyonme.service.dto.OrderLineDTO;
import com.canyoncorp.canyonme.service.dto.ProductDTO;
import com.canyoncorp.canyonme.web.rest.vm.OrderLineVM;
import com.canyoncorp.canyonme.web.rest.vm.OrderVM;
import java.util.List;

public interface OrderService {
    List<ProductDTO> purchaseOrder(OrderVM orderVM);
    List<ProductDTO> getBadOrderLinesProducts(List<OrderLineDTO> orders);
    List<OrderLineDTO> toOrderLineDTOS(List<OrderLineVM> orderLineVMS);
}
