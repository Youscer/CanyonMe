package com.canyoncorp.canyonme.service;

import com.canyoncorp.canyonme.domain.Product;
import com.canyoncorp.canyonme.service.dto.ProductDTO;
import java.util.List;

public interface ProductService {
    // search opearations

    List<Product> getAllProducts();

    public List<Product> getProductsByName(String name);

    public List<Product> getProductsByMinPrice(int price);

    public List<Product> getProductsByMaxPrice(int price);

    public List<Product> searchBy(String name, int minPrice, int maxPrice);

    // purchase operations
    private Product purchase(ProductDTO productDTO) {
        return null;
    }
}
