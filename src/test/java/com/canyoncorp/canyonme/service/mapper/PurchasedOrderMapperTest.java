package com.canyoncorp.canyonme.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class PurchasedOrderMapperTest {

    private PurchasedOrderMapper purchasedOrderMapper;

    @BeforeEach
    public void setUp() {
        purchasedOrderMapper = new PurchasedOrderMapperImpl();
    }
}
