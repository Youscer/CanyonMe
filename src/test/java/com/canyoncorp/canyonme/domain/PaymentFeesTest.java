package com.canyoncorp.canyonme.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.canyoncorp.canyonme.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class PaymentFeesTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PaymentFees.class);
        PaymentFees paymentFees1 = new PaymentFees();
        paymentFees1.setId(1L);
        PaymentFees paymentFees2 = new PaymentFees();
        paymentFees2.setId(paymentFees1.getId());
        assertThat(paymentFees1).isEqualTo(paymentFees2);
        paymentFees2.setId(2L);
        assertThat(paymentFees1).isNotEqualTo(paymentFees2);
        paymentFees1.setId(null);
        assertThat(paymentFees1).isNotEqualTo(paymentFees2);
    }
}
