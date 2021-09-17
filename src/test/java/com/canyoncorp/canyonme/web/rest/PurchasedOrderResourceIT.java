package com.canyoncorp.canyonme.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.canyoncorp.canyonme.IntegrationTest;
import com.canyoncorp.canyonme.domain.PurchasedOrder;
import com.canyoncorp.canyonme.domain.enumeration.OrderState;
import com.canyoncorp.canyonme.repository.PurchasedOrderRepository;
import com.canyoncorp.canyonme.service.dto.PurchasedOrderDTO;
import com.canyoncorp.canyonme.service.mapper.PurchasedOrderMapper;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link PurchasedOrderResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class PurchasedOrderResourceIT {

    private static final LocalDate DEFAULT_ORDER_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_ORDER_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final OrderState DEFAULT_ORDER_STATE = OrderState.NEW;
    private static final OrderState UPDATED_ORDER_STATE = OrderState.TO_COMPLETE;

    private static final String DEFAULT_SHIPPING_MODE = "AAAAAAAAAA";
    private static final String UPDATED_SHIPPING_MODE = "BBBBBBBBBB";

    private static final Float DEFAULT_SHIPPING_FEES = 1F;
    private static final Float UPDATED_SHIPPING_FEES = 2F;

    private static final String DEFAULT_PAYMENT_MODE = "AAAAAAAAAA";
    private static final String UPDATED_PAYMENT_MODE = "BBBBBBBBBB";

    private static final Float DEFAULT_PAYMENT_FEES = 1F;
    private static final Float UPDATED_PAYMENT_FEES = 2F;

    private static final String ENTITY_API_URL = "/api/purchased-orders";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private PurchasedOrderRepository purchasedOrderRepository;

    @Autowired
    private PurchasedOrderMapper purchasedOrderMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPurchasedOrderMockMvc;

    private PurchasedOrder purchasedOrder;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PurchasedOrder createEntity(EntityManager em) {
        PurchasedOrder purchasedOrder = new PurchasedOrder()
            .orderDate(DEFAULT_ORDER_DATE)
            .orderState(DEFAULT_ORDER_STATE)
            .shippingMode(DEFAULT_SHIPPING_MODE)
            .shippingFees(DEFAULT_SHIPPING_FEES)
            .paymentMode(DEFAULT_PAYMENT_MODE)
            .paymentFees(DEFAULT_PAYMENT_FEES);
        return purchasedOrder;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PurchasedOrder createUpdatedEntity(EntityManager em) {
        PurchasedOrder purchasedOrder = new PurchasedOrder()
            .orderDate(UPDATED_ORDER_DATE)
            .orderState(UPDATED_ORDER_STATE)
            .shippingMode(UPDATED_SHIPPING_MODE)
            .shippingFees(UPDATED_SHIPPING_FEES)
            .paymentMode(UPDATED_PAYMENT_MODE)
            .paymentFees(UPDATED_PAYMENT_FEES);
        return purchasedOrder;
    }

    @BeforeEach
    public void initTest() {
        purchasedOrder = createEntity(em);
    }

    @Test
    @Transactional
    void createPurchasedOrder() throws Exception {
        int databaseSizeBeforeCreate = purchasedOrderRepository.findAll().size();
        // Create the PurchasedOrder
        PurchasedOrderDTO purchasedOrderDTO = purchasedOrderMapper.toDto(purchasedOrder);
        restPurchasedOrderMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(purchasedOrderDTO))
            )
            .andExpect(status().isCreated());

        // Validate the PurchasedOrder in the database
        List<PurchasedOrder> purchasedOrderList = purchasedOrderRepository.findAll();
        assertThat(purchasedOrderList).hasSize(databaseSizeBeforeCreate + 1);
        PurchasedOrder testPurchasedOrder = purchasedOrderList.get(purchasedOrderList.size() - 1);
        assertThat(testPurchasedOrder.getOrderDate()).isEqualTo(DEFAULT_ORDER_DATE);
        assertThat(testPurchasedOrder.getOrderState()).isEqualTo(DEFAULT_ORDER_STATE);
        assertThat(testPurchasedOrder.getShippingMode()).isEqualTo(DEFAULT_SHIPPING_MODE);
        assertThat(testPurchasedOrder.getShippingFees()).isEqualTo(DEFAULT_SHIPPING_FEES);
        assertThat(testPurchasedOrder.getPaymentMode()).isEqualTo(DEFAULT_PAYMENT_MODE);
        assertThat(testPurchasedOrder.getPaymentFees()).isEqualTo(DEFAULT_PAYMENT_FEES);
    }

    @Test
    @Transactional
    void createPurchasedOrderWithExistingId() throws Exception {
        // Create the PurchasedOrder with an existing ID
        purchasedOrder.setId(1L);
        PurchasedOrderDTO purchasedOrderDTO = purchasedOrderMapper.toDto(purchasedOrder);

        int databaseSizeBeforeCreate = purchasedOrderRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restPurchasedOrderMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(purchasedOrderDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the PurchasedOrder in the database
        List<PurchasedOrder> purchasedOrderList = purchasedOrderRepository.findAll();
        assertThat(purchasedOrderList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkOrderDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = purchasedOrderRepository.findAll().size();
        // set the field null
        purchasedOrder.setOrderDate(null);

        // Create the PurchasedOrder, which fails.
        PurchasedOrderDTO purchasedOrderDTO = purchasedOrderMapper.toDto(purchasedOrder);

        restPurchasedOrderMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(purchasedOrderDTO))
            )
            .andExpect(status().isBadRequest());

        List<PurchasedOrder> purchasedOrderList = purchasedOrderRepository.findAll();
        assertThat(purchasedOrderList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkOrderStateIsRequired() throws Exception {
        int databaseSizeBeforeTest = purchasedOrderRepository.findAll().size();
        // set the field null
        purchasedOrder.setOrderState(null);

        // Create the PurchasedOrder, which fails.
        PurchasedOrderDTO purchasedOrderDTO = purchasedOrderMapper.toDto(purchasedOrder);

        restPurchasedOrderMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(purchasedOrderDTO))
            )
            .andExpect(status().isBadRequest());

        List<PurchasedOrder> purchasedOrderList = purchasedOrderRepository.findAll();
        assertThat(purchasedOrderList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllPurchasedOrders() throws Exception {
        // Initialize the database
        purchasedOrderRepository.saveAndFlush(purchasedOrder);

        // Get all the purchasedOrderList
        restPurchasedOrderMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(purchasedOrder.getId().intValue())))
            .andExpect(jsonPath("$.[*].orderDate").value(hasItem(DEFAULT_ORDER_DATE.toString())))
            .andExpect(jsonPath("$.[*].orderState").value(hasItem(DEFAULT_ORDER_STATE.toString())))
            .andExpect(jsonPath("$.[*].shippingMode").value(hasItem(DEFAULT_SHIPPING_MODE)))
            .andExpect(jsonPath("$.[*].shippingFees").value(hasItem(DEFAULT_SHIPPING_FEES.doubleValue())))
            .andExpect(jsonPath("$.[*].paymentMode").value(hasItem(DEFAULT_PAYMENT_MODE)))
            .andExpect(jsonPath("$.[*].paymentFees").value(hasItem(DEFAULT_PAYMENT_FEES.doubleValue())));
    }

    @Test
    @Transactional
    void getPurchasedOrder() throws Exception {
        // Initialize the database
        purchasedOrderRepository.saveAndFlush(purchasedOrder);

        // Get the purchasedOrder
        restPurchasedOrderMockMvc
            .perform(get(ENTITY_API_URL_ID, purchasedOrder.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(purchasedOrder.getId().intValue()))
            .andExpect(jsonPath("$.orderDate").value(DEFAULT_ORDER_DATE.toString()))
            .andExpect(jsonPath("$.orderState").value(DEFAULT_ORDER_STATE.toString()))
            .andExpect(jsonPath("$.shippingMode").value(DEFAULT_SHIPPING_MODE))
            .andExpect(jsonPath("$.shippingFees").value(DEFAULT_SHIPPING_FEES.doubleValue()))
            .andExpect(jsonPath("$.paymentMode").value(DEFAULT_PAYMENT_MODE))
            .andExpect(jsonPath("$.paymentFees").value(DEFAULT_PAYMENT_FEES.doubleValue()));
    }

    @Test
    @Transactional
    void getNonExistingPurchasedOrder() throws Exception {
        // Get the purchasedOrder
        restPurchasedOrderMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewPurchasedOrder() throws Exception {
        // Initialize the database
        purchasedOrderRepository.saveAndFlush(purchasedOrder);

        int databaseSizeBeforeUpdate = purchasedOrderRepository.findAll().size();

        // Update the purchasedOrder
        PurchasedOrder updatedPurchasedOrder = purchasedOrderRepository.findById(purchasedOrder.getId()).get();
        // Disconnect from session so that the updates on updatedPurchasedOrder are not directly saved in db
        em.detach(updatedPurchasedOrder);
        updatedPurchasedOrder
            .orderDate(UPDATED_ORDER_DATE)
            .orderState(UPDATED_ORDER_STATE)
            .shippingMode(UPDATED_SHIPPING_MODE)
            .shippingFees(UPDATED_SHIPPING_FEES)
            .paymentMode(UPDATED_PAYMENT_MODE)
            .paymentFees(UPDATED_PAYMENT_FEES);
        PurchasedOrderDTO purchasedOrderDTO = purchasedOrderMapper.toDto(updatedPurchasedOrder);

        restPurchasedOrderMockMvc
            .perform(
                put(ENTITY_API_URL_ID, purchasedOrderDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(purchasedOrderDTO))
            )
            .andExpect(status().isOk());

        // Validate the PurchasedOrder in the database
        List<PurchasedOrder> purchasedOrderList = purchasedOrderRepository.findAll();
        assertThat(purchasedOrderList).hasSize(databaseSizeBeforeUpdate);
        PurchasedOrder testPurchasedOrder = purchasedOrderList.get(purchasedOrderList.size() - 1);
        assertThat(testPurchasedOrder.getOrderDate()).isEqualTo(UPDATED_ORDER_DATE);
        assertThat(testPurchasedOrder.getOrderState()).isEqualTo(UPDATED_ORDER_STATE);
        assertThat(testPurchasedOrder.getShippingMode()).isEqualTo(UPDATED_SHIPPING_MODE);
        assertThat(testPurchasedOrder.getShippingFees()).isEqualTo(UPDATED_SHIPPING_FEES);
        assertThat(testPurchasedOrder.getPaymentMode()).isEqualTo(UPDATED_PAYMENT_MODE);
        assertThat(testPurchasedOrder.getPaymentFees()).isEqualTo(UPDATED_PAYMENT_FEES);
    }

    @Test
    @Transactional
    void putNonExistingPurchasedOrder() throws Exception {
        int databaseSizeBeforeUpdate = purchasedOrderRepository.findAll().size();
        purchasedOrder.setId(count.incrementAndGet());

        // Create the PurchasedOrder
        PurchasedOrderDTO purchasedOrderDTO = purchasedOrderMapper.toDto(purchasedOrder);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPurchasedOrderMockMvc
            .perform(
                put(ENTITY_API_URL_ID, purchasedOrderDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(purchasedOrderDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the PurchasedOrder in the database
        List<PurchasedOrder> purchasedOrderList = purchasedOrderRepository.findAll();
        assertThat(purchasedOrderList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchPurchasedOrder() throws Exception {
        int databaseSizeBeforeUpdate = purchasedOrderRepository.findAll().size();
        purchasedOrder.setId(count.incrementAndGet());

        // Create the PurchasedOrder
        PurchasedOrderDTO purchasedOrderDTO = purchasedOrderMapper.toDto(purchasedOrder);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPurchasedOrderMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(purchasedOrderDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the PurchasedOrder in the database
        List<PurchasedOrder> purchasedOrderList = purchasedOrderRepository.findAll();
        assertThat(purchasedOrderList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamPurchasedOrder() throws Exception {
        int databaseSizeBeforeUpdate = purchasedOrderRepository.findAll().size();
        purchasedOrder.setId(count.incrementAndGet());

        // Create the PurchasedOrder
        PurchasedOrderDTO purchasedOrderDTO = purchasedOrderMapper.toDto(purchasedOrder);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPurchasedOrderMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(purchasedOrderDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the PurchasedOrder in the database
        List<PurchasedOrder> purchasedOrderList = purchasedOrderRepository.findAll();
        assertThat(purchasedOrderList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdatePurchasedOrderWithPatch() throws Exception {
        // Initialize the database
        purchasedOrderRepository.saveAndFlush(purchasedOrder);

        int databaseSizeBeforeUpdate = purchasedOrderRepository.findAll().size();

        // Update the purchasedOrder using partial update
        PurchasedOrder partialUpdatedPurchasedOrder = new PurchasedOrder();
        partialUpdatedPurchasedOrder.setId(purchasedOrder.getId());

        partialUpdatedPurchasedOrder
            .orderState(UPDATED_ORDER_STATE)
            .shippingMode(UPDATED_SHIPPING_MODE)
            .shippingFees(UPDATED_SHIPPING_FEES)
            .paymentMode(UPDATED_PAYMENT_MODE);

        restPurchasedOrderMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPurchasedOrder.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPurchasedOrder))
            )
            .andExpect(status().isOk());

        // Validate the PurchasedOrder in the database
        List<PurchasedOrder> purchasedOrderList = purchasedOrderRepository.findAll();
        assertThat(purchasedOrderList).hasSize(databaseSizeBeforeUpdate);
        PurchasedOrder testPurchasedOrder = purchasedOrderList.get(purchasedOrderList.size() - 1);
        assertThat(testPurchasedOrder.getOrderDate()).isEqualTo(DEFAULT_ORDER_DATE);
        assertThat(testPurchasedOrder.getOrderState()).isEqualTo(UPDATED_ORDER_STATE);
        assertThat(testPurchasedOrder.getShippingMode()).isEqualTo(UPDATED_SHIPPING_MODE);
        assertThat(testPurchasedOrder.getShippingFees()).isEqualTo(UPDATED_SHIPPING_FEES);
        assertThat(testPurchasedOrder.getPaymentMode()).isEqualTo(UPDATED_PAYMENT_MODE);
        assertThat(testPurchasedOrder.getPaymentFees()).isEqualTo(DEFAULT_PAYMENT_FEES);
    }

    @Test
    @Transactional
    void fullUpdatePurchasedOrderWithPatch() throws Exception {
        // Initialize the database
        purchasedOrderRepository.saveAndFlush(purchasedOrder);

        int databaseSizeBeforeUpdate = purchasedOrderRepository.findAll().size();

        // Update the purchasedOrder using partial update
        PurchasedOrder partialUpdatedPurchasedOrder = new PurchasedOrder();
        partialUpdatedPurchasedOrder.setId(purchasedOrder.getId());

        partialUpdatedPurchasedOrder
            .orderDate(UPDATED_ORDER_DATE)
            .orderState(UPDATED_ORDER_STATE)
            .shippingMode(UPDATED_SHIPPING_MODE)
            .shippingFees(UPDATED_SHIPPING_FEES)
            .paymentMode(UPDATED_PAYMENT_MODE)
            .paymentFees(UPDATED_PAYMENT_FEES);

        restPurchasedOrderMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPurchasedOrder.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPurchasedOrder))
            )
            .andExpect(status().isOk());

        // Validate the PurchasedOrder in the database
        List<PurchasedOrder> purchasedOrderList = purchasedOrderRepository.findAll();
        assertThat(purchasedOrderList).hasSize(databaseSizeBeforeUpdate);
        PurchasedOrder testPurchasedOrder = purchasedOrderList.get(purchasedOrderList.size() - 1);
        assertThat(testPurchasedOrder.getOrderDate()).isEqualTo(UPDATED_ORDER_DATE);
        assertThat(testPurchasedOrder.getOrderState()).isEqualTo(UPDATED_ORDER_STATE);
        assertThat(testPurchasedOrder.getShippingMode()).isEqualTo(UPDATED_SHIPPING_MODE);
        assertThat(testPurchasedOrder.getShippingFees()).isEqualTo(UPDATED_SHIPPING_FEES);
        assertThat(testPurchasedOrder.getPaymentMode()).isEqualTo(UPDATED_PAYMENT_MODE);
        assertThat(testPurchasedOrder.getPaymentFees()).isEqualTo(UPDATED_PAYMENT_FEES);
    }

    @Test
    @Transactional
    void patchNonExistingPurchasedOrder() throws Exception {
        int databaseSizeBeforeUpdate = purchasedOrderRepository.findAll().size();
        purchasedOrder.setId(count.incrementAndGet());

        // Create the PurchasedOrder
        PurchasedOrderDTO purchasedOrderDTO = purchasedOrderMapper.toDto(purchasedOrder);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPurchasedOrderMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, purchasedOrderDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(purchasedOrderDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the PurchasedOrder in the database
        List<PurchasedOrder> purchasedOrderList = purchasedOrderRepository.findAll();
        assertThat(purchasedOrderList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchPurchasedOrder() throws Exception {
        int databaseSizeBeforeUpdate = purchasedOrderRepository.findAll().size();
        purchasedOrder.setId(count.incrementAndGet());

        // Create the PurchasedOrder
        PurchasedOrderDTO purchasedOrderDTO = purchasedOrderMapper.toDto(purchasedOrder);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPurchasedOrderMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(purchasedOrderDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the PurchasedOrder in the database
        List<PurchasedOrder> purchasedOrderList = purchasedOrderRepository.findAll();
        assertThat(purchasedOrderList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamPurchasedOrder() throws Exception {
        int databaseSizeBeforeUpdate = purchasedOrderRepository.findAll().size();
        purchasedOrder.setId(count.incrementAndGet());

        // Create the PurchasedOrder
        PurchasedOrderDTO purchasedOrderDTO = purchasedOrderMapper.toDto(purchasedOrder);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPurchasedOrderMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(purchasedOrderDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the PurchasedOrder in the database
        List<PurchasedOrder> purchasedOrderList = purchasedOrderRepository.findAll();
        assertThat(purchasedOrderList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deletePurchasedOrder() throws Exception {
        // Initialize the database
        purchasedOrderRepository.saveAndFlush(purchasedOrder);

        int databaseSizeBeforeDelete = purchasedOrderRepository.findAll().size();

        // Delete the purchasedOrder
        restPurchasedOrderMockMvc
            .perform(delete(ENTITY_API_URL_ID, purchasedOrder.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PurchasedOrder> purchasedOrderList = purchasedOrderRepository.findAll();
        assertThat(purchasedOrderList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
