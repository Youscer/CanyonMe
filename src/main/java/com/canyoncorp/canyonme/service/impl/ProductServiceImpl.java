package com.canyoncorp.canyonme.service.impl;

import com.canyoncorp.canyonme.domain.Product;
import com.canyoncorp.canyonme.repository.ProductRepository;
import com.canyoncorp.canyonme.repository.ProductSearchRepository;
import com.canyoncorp.canyonme.repository.spec.ProductSpecification;
import com.canyoncorp.canyonme.repository.spec.SearchCriteria;
import com.canyoncorp.canyonme.service.ProductService;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ProductServiceImpl implements ProductService {

    private final Logger log = LoggerFactory.getLogger(ProductServiceImpl.class);

    private ProductRepository productRepository;
    private ProductSearchRepository productSearch;

    public ProductServiceImpl(ProductRepository productRepository, ProductSearchRepository productSearch) {
        this.productRepository = productRepository;
        this.productSearch = productSearch;
    }

    @Transactional(readOnly = true)
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<Product> getProductsByName(String name) {
        ProductSpecification nameSpec = new ProductSpecification(new SearchCriteria("name", ":", name));
        return productSearch.findAll(Specification.where(nameSpec));
    }

    @Transactional(readOnly = true)
    public List<Product> searchBy(String name, int minPrice, int maxPrice) {
        ProductSpecification nameSpec = new ProductSpecification(new SearchCriteria("name", ":", name));
        ProductSpecification minPriceSpec = new ProductSpecification(new SearchCriteria("unitPrice", ">", Integer.toString(minPrice)));
        ProductSpecification maxPriceSpec = new ProductSpecification(new SearchCriteria("unitPrice", "<", Integer.toString(maxPrice)));

        return productSearch.findAll(Specification.where(nameSpec).and(minPriceSpec).and(maxPriceSpec));
    }
}
