package com.canyoncorp.canyonme.repository;

import com.canyoncorp.canyonme.domain.PaymentFees;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the PaymentFees entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PaymentFeesRepository extends JpaRepository<PaymentFees, Long> {}
