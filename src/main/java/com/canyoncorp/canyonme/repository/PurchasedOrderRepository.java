package com.canyoncorp.canyonme.repository;

import com.canyoncorp.canyonme.domain.PurchasedOrder;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the PurchasedOrder entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PurchasedOrderRepository extends JpaRepository<PurchasedOrder, Long> {}
