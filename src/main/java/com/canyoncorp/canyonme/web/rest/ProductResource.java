package com.canyoncorp.canyonme.web.rest;

import com.canyoncorp.canyonme.domain.OrderLine;
import com.canyoncorp.canyonme.domain.Product;
import com.canyoncorp.canyonme.repository.ProductRepository;
import com.canyoncorp.canyonme.security.AuthoritiesConstants;
import com.canyoncorp.canyonme.service.OrderService;
import com.canyoncorp.canyonme.service.ProductService;
import com.canyoncorp.canyonme.service.UnavailableProductException;
import com.canyoncorp.canyonme.service.dto.OrderLineDTO;
import com.canyoncorp.canyonme.service.dto.ProductDTO;
import com.canyoncorp.canyonme.service.mapper.ProductMapper;
import com.canyoncorp.canyonme.web.rest.errors.BadRequestAlertException;
import com.canyoncorp.canyonme.web.rest.vm.OrderLineVM;
import com.canyoncorp.canyonme.web.rest.vm.OrderVM;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.swing.text.html.Option;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.UnexpectedRollbackException;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.canyoncorp.canyonme.domain.Product}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ProductResource {

    private final Logger log = LoggerFactory.getLogger(ProductResource.class);

    private static final String ENTITY_NAME = "product";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProductService productService;
    private final ProductRepository productRepository;
    private final OrderService orderService;
    private final ProductMapper productMapper;

    public ProductResource(
        ProductRepository productRepository,
        ProductService productService,
        OrderService orderService,
        ProductMapper productMapper
    ) {
        this.productRepository = productRepository;
        this.productService = productService;
        this.orderService = orderService;
        this.productMapper = productMapper;
    }

    /**
     * {@code POST  /products} : Create a new product.
     *
     * @param productDTO the productDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new productDTO, or with status {@code 400 (Bad Request)} if the product has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/products")
    @PreAuthorize("hasRole(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<ProductDTO> createProduct(@Valid @RequestBody ProductDTO productDTO) throws URISyntaxException {
        log.debug("REST request to save Product : {}", productDTO);
        if (productDTO.getId() != null) {
            throw new BadRequestAlertException("A new product cannot already have an ID", ENTITY_NAME, "idexists");
        }

        ProductDTO newProductDTO = productService.addProduct(productDTO);

        return ResponseEntity
            .created(new URI("/api/products/" + newProductDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, newProductDTO.getId().toString()))
            .body(newProductDTO);
    }

    /**
     * {@code PUT  /products/:id} : Updates an existing product.
     *
     * @param id the id of the productDTO to save.
     * @param productDTO the productDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated productDTO,
     * or with status {@code 400 (Bad Request)} if the productDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the productDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/products/{id}")
    public ResponseEntity<ProductDTO> updateProduct(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody ProductDTO productDTO
    ) throws URISyntaxException {
        log.debug("REST request to update Product : {}, {}", id, productDTO);
        if (productDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, productDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!productRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Product product = productMapper.toEntity(productDTO);
        product = productRepository.save(product);
        ProductDTO result = productMapper.toDto(product);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, productDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /products/:id} : Partial updates given fields of an existing product, field will ignore if it is null
     *
     * @param id the id of the productDTO to save.
     * @param productDTO the productDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated productDTO,
     * or with status {@code 400 (Bad Request)} if the productDTO is not valid,
     * or with status {@code 404 (Not Found)} if the productDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the productDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/products/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<ProductDTO> partialUpdateProduct(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody ProductDTO productDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update Product partially : {}, {}", id, productDTO);
        if (productDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, productDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!productRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ProductDTO> result = productRepository
            .findById(productDTO.getId())
            .map(
                existingProduct -> {
                    productMapper.partialUpdate(existingProduct, productDTO);

                    return existingProduct;
                }
            )
            .map(productRepository::save)
            .map(productMapper::toDto);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, productDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /products} : get all the products.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of products in body.
     */
    @GetMapping("/products")
    public List<ProductDTO> getAllProducts(
        @RequestParam(value = "name", defaultValue = "") String name,
        @RequestParam(value = "min", defaultValue = "0") int min,
        @RequestParam(value = "max", defaultValue = "2147483647") int max
    ) {
        log.debug("REST request to get all Products");
        return productService.searchBy(name, min, max);
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<ProductDTO> getProduct(@PathVariable Long id) {
        log.debug("REST request to get Product : {}", id);
        Optional<ProductDTO> productDTO = Optional.of(productService.getProduct(id));
        return ResponseUtil.wrapOrNotFound(productDTO);
    }

    /**
     * {@code GET  /purchase} purches an order, o
     * @param orderVM
     * @return
     */
    @PostMapping("/purchase")
    //@PreAuthorize("hasRole(\"" + AuthoritiesConstants.USER + "\")")
    public ResponseEntity<List<ProductDTO>> purchase(@RequestBody OrderVM orderVM) {
        ObjectMapper objectMapper = new ObjectMapper();
        List<OrderLineDTO> orderLineDTOS = orderService.toOrderLineDTOS(orderVM.getOrderLines());
        List<ProductDTO> productDTOS;

        productDTOS = orderService.getBadOrderLinesProducts(orderLineDTOS);
        if (!productDTOS.isEmpty()) return new ResponseEntity<List<ProductDTO>>(productDTOS, HttpStatus.CONFLICT);

        try {
            productDTOS = orderService.purchaseOrder(orderVM);
        } catch (UnavailableProductException e) {
            return new ResponseEntity<List<ProductDTO>>(orderService.getBadOrderLinesProducts(orderLineDTOS), HttpStatus.CONFLICT);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Unknown exception caught \n" + e.getMessage(), e);
        }

        return new ResponseEntity<List<ProductDTO>>(productDTOS, HttpStatus.OK);
    }

    /**
     * {@code DELETE  /products/:id} : delete the "id" product.
     *
     * @param id the id of the productDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/products/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        log.debug("REST request to delete Product : {}", id);
        productService.deleteProduct(id);
        // productRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
