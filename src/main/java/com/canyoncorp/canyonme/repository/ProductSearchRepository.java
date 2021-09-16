package com.canyoncorp.canyonme.repository;

import com.canyoncorp.canyonme.domain.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface ProductSearchRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {}
