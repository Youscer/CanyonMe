package com.canyoncorp.canyonme.service.impl;

import com.canyoncorp.canyonme.domain.OrderLine;
import com.canyoncorp.canyonme.domain.Product;
import com.canyoncorp.canyonme.service.OrderService;
import com.canyoncorp.canyonme.service.ProductService;
import com.canyoncorp.canyonme.service.UnavailableProductException;
import com.canyoncorp.canyonme.service.dto.OrderLineDTO;
import com.canyoncorp.canyonme.service.dto.ProductDTO;
import com.canyoncorp.canyonme.service.mapper.ProductMapper;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class OrderServiceImpl implements OrderService {

    private ProductService productService;
    private ProductMapper productMapper;

    public OrderServiceImpl(ProductService productService, ProductMapper productMapper) {
        this.productService = productService;
        this.productMapper = productMapper;
    }

    private final Logger log = LoggerFactory.getLogger(OrderServiceImpl.class);

    @Override
    public List<ProductDTO> purchaseOrder(List<OrderLineDTO> orders) {
        List<ProductDTO> remainingItems = new ArrayList<ProductDTO>();
        try {
            for (OrderLineDTO orderLine : orders) {
                remainingItems.add(productService.purchase(orderLine).get());
            }
        } catch (UnavailableProductException e) {
            log.info("bad orderline found");
            throw e;
        } catch (Exception e) {
            log.error("unknown exception caught");
            System.out.println(e.getMessage());
            throw e;
        }

        return remainingItems;
    }

    public List<ProductDTO> getBadOrderLinesProducts(List<OrderLineDTO> orders) {
        List<ProductDTO> products = new ArrayList<ProductDTO>();
        for (OrderLineDTO orderLine : orders) {
            Optional<ProductDTO> productDTO = productService.getProduct(orderLine);
            if (!productDTO.isPresent() || productDTO.get().getQuantity() < orderLine.getQuantity()) products.add(productDTO.get());
        }
        return products;
    }
}
