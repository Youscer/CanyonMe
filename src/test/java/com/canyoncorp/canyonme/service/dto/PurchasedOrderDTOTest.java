package com.canyoncorp.canyonme.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.canyoncorp.canyonme.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class PurchasedOrderDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(PurchasedOrderDTO.class);
        PurchasedOrderDTO purchasedOrderDTO1 = new PurchasedOrderDTO();
        purchasedOrderDTO1.setId(1L);
        PurchasedOrderDTO purchasedOrderDTO2 = new PurchasedOrderDTO();
        assertThat(purchasedOrderDTO1).isNotEqualTo(purchasedOrderDTO2);
        purchasedOrderDTO2.setId(purchasedOrderDTO1.getId());
        assertThat(purchasedOrderDTO1).isEqualTo(purchasedOrderDTO2);
        purchasedOrderDTO2.setId(2L);
        assertThat(purchasedOrderDTO1).isNotEqualTo(purchasedOrderDTO2);
        purchasedOrderDTO1.setId(null);
        assertThat(purchasedOrderDTO1).isNotEqualTo(purchasedOrderDTO2);
    }
}
