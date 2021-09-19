package com.canyoncorp.canyonme.service.impl;

import com.canyoncorp.canyonme.domain.Product;
import com.canyoncorp.canyonme.repository.PictureRepository;
import com.canyoncorp.canyonme.repository.ProductRepository;
import com.canyoncorp.canyonme.repository.ProductSearchRepository;
import com.canyoncorp.canyonme.repository.spec.ProductSpecification;
import com.canyoncorp.canyonme.repository.spec.SearchCriteria;
import com.canyoncorp.canyonme.service.PictureService;
import com.canyoncorp.canyonme.service.ProductService;
import com.canyoncorp.canyonme.service.UnavailableProductException;
import com.canyoncorp.canyonme.service.dto.OrderLineDTO;
import com.canyoncorp.canyonme.service.dto.ProductDTO;
import com.canyoncorp.canyonme.service.mapper.PictureVMMapper;
import com.canyoncorp.canyonme.service.mapper.ProductMapper;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(rollbackFor = { UnavailableProductException.class })
public class ProductServiceImpl implements ProductService {

    private final Logger log = LoggerFactory.getLogger(ProductServiceImpl.class);

    private ProductRepository productRepository;
    private ProductSearchRepository productSearch;
    private PictureService pictureService;
    private ProductMapper productMapper;

    public ProductServiceImpl(
        ProductRepository productRepository,
        ProductSearchRepository productSearch,
        ProductMapper productMapper,
        PictureService pictureService
    ) {
        this.productRepository = productRepository;
        this.pictureService = pictureService;
        this.productSearch = productSearch;
        this.productMapper = productMapper;
    }

    @Override
    public ProductDTO getProduct(Long id) {
        return productMapper.toDto(productRepository.getOne(id));
    }

    @Transactional(readOnly = true)
    public List<ProductDTO> getAllProducts() {
        List<ProductDTO> productDTOS = productMapper.toDto(productRepository.findAll());
        setPictures(productDTOS);
        return productDTOS;
    }

    @Transactional(readOnly = true)
    public List<ProductDTO> getProductsByName(String name) {
        ProductSpecification nameSpec = new ProductSpecification(new SearchCriteria("name", ":", name));
        List<ProductDTO> productDTOS = productMapper.toDto(productSearch.findAll(Specification.where(nameSpec)));
        setPictures(productDTOS);
        return productDTOS;
    }

    @Transactional(readOnly = true)
    public List<ProductDTO> getProductsByMinPrice(int price) {
        if (price < 0) throw new IllegalArgumentException("minPrice should be always positive");

        // creating specefications
        ProductSpecification minPriceSpec = new ProductSpecification(new SearchCriteria("unitPrice", ">", Integer.toString(price)));

        List<ProductDTO> productDTOS = productMapper.toDto(productSearch.findAll(Specification.where(minPriceSpec)));
        setPictures(productDTOS);
        return productDTOS;
    }

    @Transactional(readOnly = true)
    public List<ProductDTO> getProductsByMaxPrice(int price) {
        if (price < 0) throw new IllegalArgumentException("maxPrice should be always positive");

        // creating specefications
        ProductSpecification maxPriceSpec = new ProductSpecification(new SearchCriteria("unitPrice", "<", Integer.toString(price)));

        List<ProductDTO> productDTOS = productMapper.toDto(productSearch.findAll(Specification.where(maxPriceSpec)));
        setPictures(productDTOS);
        return productDTOS;
    }

    @Transactional(readOnly = true)
    public List<ProductDTO> searchBy(String name, int minPrice, int maxPrice) {
        if (minPrice > maxPrice) throw new IllegalArgumentException("minPrice should not be greater than maxPrice");
        if (minPrice < 0 || maxPrice < 0) throw new IllegalArgumentException("a price value should always be positive");

        // creating specefications
        ProductSpecification nameSpec = new ProductSpecification(new SearchCriteria("name", ":", name));
        ProductSpecification minPriceSpec = new ProductSpecification(new SearchCriteria("unitPrice", ">", Integer.toString(minPrice)));
        ProductSpecification maxPriceSpec = new ProductSpecification(new SearchCriteria("unitPrice", "<", Integer.toString(maxPrice)));

        List<ProductDTO> productDTOS = productMapper.toDto(
            productSearch.findAll(Specification.where(nameSpec).and(minPriceSpec).and(maxPriceSpec))
        );
        setPictures(productDTOS);
        return productDTOS;
    }

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

    private void setPictures(ProductDTO productDTO) {
        productDTO.setPictures(pictureService.getProductPictures(productDTO));
    }

    private void setPictures(List<ProductDTO> productDTOS) {
        for (ProductDTO productDTO : productDTOS) setPictures(productDTO);
    }
}
