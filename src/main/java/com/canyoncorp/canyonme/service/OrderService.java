package com.canyoncorp.canyonme.service;

import com.canyoncorp.canyonme.domain.Product;
import com.canyoncorp.canyonme.service.dto.OrderLineDTO;
import com.canyoncorp.canyonme.service.dto.ProductDTO;
import java.util.List;

public interface OrderService {
    List<ProductDTO> purchaseOrder(List<OrderLineDTO> orders);
    List<ProductDTO> getBadOrderLinesProducts(List<OrderLineDTO> orders);
}
