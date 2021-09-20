package com.canyoncorp.canyonme.service;

import com.canyoncorp.canyonme.domain.Product;
import java.util.List;

public interface ProductService {
    List<Product> getAllProducts();

    public List<Product> getProductsByName(String name);

    public List<Product> getProductsByMinPrice(int price);

    public List<Product> getProductsByMaxPrice(int price);

    public List<Product> searchBy(String name, int minPrice, int maxPrice);
}
