package com.canyoncorp.canyonme.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.canyoncorp.canyonme.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ShippingFeesTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ShippingFees.class);
        ShippingFees shippingFees1 = new ShippingFees();
        shippingFees1.setId(1L);
        ShippingFees shippingFees2 = new ShippingFees();
        shippingFees2.setId(shippingFees1.getId());
        assertThat(shippingFees1).isEqualTo(shippingFees2);
        shippingFees2.setId(2L);
        assertThat(shippingFees1).isNotEqualTo(shippingFees2);
        shippingFees1.setId(null);
        assertThat(shippingFees1).isNotEqualTo(shippingFees2);
    }
}
