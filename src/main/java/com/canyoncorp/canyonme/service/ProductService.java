package com.canyoncorp.canyonme.service;

import com.canyoncorp.canyonme.domain.Product;
import com.canyoncorp.canyonme.service.dto.OrderLineDTO;
import com.canyoncorp.canyonme.service.dto.ProductDTO;
import java.util.List;
import java.util.Optional;

public interface ProductService {
    // search opearations

    List<ProductDTO> getAllProducts();

    public List<ProductDTO> getProductsByName(String name);

    public List<ProductDTO> getProductsByMinPrice(int price);

    public List<ProductDTO> getProductsByMaxPrice(int price);

    public List<ProductDTO> searchBy(String name, int minPrice, int maxPrice);

    // purchase operations
    public Optional<ProductDTO> purchase(OrderLineDTO orderLineDTO);

    public Optional<ProductDTO> getProduct(OrderLineDTO orderLineDTO);
}
