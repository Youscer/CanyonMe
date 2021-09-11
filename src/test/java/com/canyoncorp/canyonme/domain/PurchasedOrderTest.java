package com.canyoncorp.canyonme.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.canyoncorp.canyonme.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class PurchasedOrderTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PurchasedOrder.class);
        PurchasedOrder purchasedOrder1 = new PurchasedOrder();
        purchasedOrder1.setId(1L);
        PurchasedOrder purchasedOrder2 = new PurchasedOrder();
        purchasedOrder2.setId(purchasedOrder1.getId());
        assertThat(purchasedOrder1).isEqualTo(purchasedOrder2);
        purchasedOrder2.setId(2L);
        assertThat(purchasedOrder1).isNotEqualTo(purchasedOrder2);
        purchasedOrder1.setId(null);
        assertThat(purchasedOrder1).isNotEqualTo(purchasedOrder2);
    }
}
