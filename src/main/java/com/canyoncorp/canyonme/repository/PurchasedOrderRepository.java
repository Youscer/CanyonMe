package com.canyoncorp.canyonme.repository;

import com.canyoncorp.canyonme.domain.PurchasedOrder;
import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the PurchasedOrder entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PurchasedOrderRepository extends JpaRepository<PurchasedOrder, Long> {
    @Query("select order from PurchasedOrder order where order.person.user.login = ?#{principal.username}")
    List<PurchasedOrder> getByUserIsConnectedUser();
}
