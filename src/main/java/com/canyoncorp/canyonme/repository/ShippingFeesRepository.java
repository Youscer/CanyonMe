package com.canyoncorp.canyonme.repository;

import com.canyoncorp.canyonme.domain.ShippingFees;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the ShippingFees entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ShippingFeesRepository extends JpaRepository<ShippingFees, Long> {}
