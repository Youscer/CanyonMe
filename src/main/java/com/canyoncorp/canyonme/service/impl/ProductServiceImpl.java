package com.canyoncorp.canyonme.service.impl;

import com.canyoncorp.canyonme.domain.Product;
import com.canyoncorp.canyonme.repository.ProductRepository;
import com.canyoncorp.canyonme.repository.ProductSearchRepository;
import com.canyoncorp.canyonme.repository.spec.ProductSpecification;
import com.canyoncorp.canyonme.repository.spec.SearchCriteria;
import com.canyoncorp.canyonme.service.ProductService;
import com.canyoncorp.canyonme.service.UnavailableProductException;
import com.canyoncorp.canyonme.service.dto.OrderLineDTO;
import com.canyoncorp.canyonme.service.dto.ProductDTO;
import com.canyoncorp.canyonme.service.mapper.ProductMapper;
import java.util.List;
import java.util.Optional;
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
    private ProductMapper productMapper;

    public ProductServiceImpl(ProductRepository productRepository, ProductSearchRepository productSearch, ProductMapper productMapper) {
        this.productRepository = productRepository;
        this.productSearch = productSearch;
        this.productMapper = productMapper;
    }

    @Transactional(readOnly = true)
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<ProductDTO> getProductsByName(String name) {
        ProductSpecification nameSpec = new ProductSpecification(new SearchCriteria("name", ":", name));
        return productMapper.toDto(productSearch.findAll(Specification.where(nameSpec)));
    }

    @Transactional(readOnly = true)
    public List<ProductDTO> getProductsByMinPrice(int price) {
        if (price < 0) throw new IllegalArgumentException("minPrice should be always positive");

        // creating specefications
        ProductSpecification minPriceSpec = new ProductSpecification(new SearchCriteria("unitPrice", ">", Integer.toString(price)));

        return productMapper.toDto(productSearch.findAll(Specification.where(minPriceSpec)));
    }

    @Transactional(readOnly = true)
    public List<ProductDTO> getProductsByMaxPrice(int price) {
        if (price < 0) throw new IllegalArgumentException("maxPrice should be always positive");

        // creating specefications
        ProductSpecification maxPriceSpec = new ProductSpecification(new SearchCriteria("unitPrice", "<", Integer.toString(price)));

        return productMapper.toDto(productSearch.findAll(Specification.where(maxPriceSpec)));
    }

    @Transactional(readOnly = true)
    public List<ProductDTO> searchBy(String name, int minPrice, int maxPrice) {
        if (minPrice > maxPrice) throw new IllegalArgumentException("minPrice should not be greater than maxPrice");
        if (minPrice < 0 || maxPrice < 0) throw new IllegalArgumentException("a price value should always be positive");

        // creating specefications
        ProductSpecification nameSpec = new ProductSpecification(new SearchCriteria("name", ":", name));
        ProductSpecification minPriceSpec = new ProductSpecification(new SearchCriteria("unitPrice", ">", Integer.toString(minPrice)));
        ProductSpecification maxPriceSpec = new ProductSpecification(new SearchCriteria("unitPrice", "<", Integer.toString(maxPrice)));

        return productMapper.toDto(productSearch.findAll(Specification.where(nameSpec).and(minPriceSpec).and(maxPriceSpec)));
    }

    @Transactional(rollbackFor = { UnavailableProductException.class, Error.class })
    public Optional<ProductDTO> purchase(OrderLineDTO orderLineDTO) {
        Optional<ProductDTO> product = getProduct(orderLineDTO);

        /* if product deosn't exist, or product quantity is not enough, throw an exception */
        if (!product.isPresent() || product.get().getQuantity() < orderLineDTO.getQuantity()) {
            log.warn("Unavailable product quantity exception launched");
            throw new UnavailableProductException();
        }

        /* purchasing product */
        int newQuantity = (int) (product.get().getQuantity() - orderLineDTO.getQuantity());
        product.get().setQuantity(newQuantity);
        productRepository.save(productMapper.toEntity(product.get()));

        return product;
    }

    @Transactional(readOnly = true)
    public Optional<ProductDTO> getProduct(OrderLineDTO orderLineDTO) {
        return productRepository.findById(orderLineDTO.getProduct()).map(productMapper::toDto);
    }
}
