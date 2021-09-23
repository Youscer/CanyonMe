package com.canyoncorp.canyonme.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.canyoncorp.canyonme.IntegrationTest;
import com.canyoncorp.canyonme.domain.PaymentFees;
import com.canyoncorp.canyonme.domain.enumeration.PaymentMode;
import com.canyoncorp.canyonme.repository.PaymentFeesRepository;
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
 * Integration tests for the {@link PaymentFeesResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class PaymentFeesResourceIT {

    private static final PaymentMode DEFAULT_PAYMENT_MODE = PaymentMode.YES_CARD;
    private static final PaymentMode UPDATED_PAYMENT_MODE = PaymentMode.YES_CARD;

    private static final Float DEFAULT_FEES = 1F;
    private static final Float UPDATED_FEES = 2F;

    private static final String ENTITY_API_URL = "/api/payment-fees";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private PaymentFeesRepository paymentFeesRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPaymentFeesMockMvc;

    private PaymentFees paymentFees;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PaymentFees createEntity(EntityManager em) {
        PaymentFees paymentFees = new PaymentFees().paymentMode(DEFAULT_PAYMENT_MODE).fees(DEFAULT_FEES);
        return paymentFees;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PaymentFees createUpdatedEntity(EntityManager em) {
        PaymentFees paymentFees = new PaymentFees().paymentMode(UPDATED_PAYMENT_MODE).fees(UPDATED_FEES);
        return paymentFees;
    }

    @BeforeEach
    public void initTest() {
        paymentFees = createEntity(em);
    }

    @Test
    @Transactional
    void createPaymentFees() throws Exception {
        int databaseSizeBeforeCreate = paymentFeesRepository.findAll().size();
        // Create the PaymentFees
        restPaymentFeesMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(paymentFees)))
            .andExpect(status().isCreated());

        // Validate the PaymentFees in the database
        List<PaymentFees> paymentFeesList = paymentFeesRepository.findAll();
        assertThat(paymentFeesList).hasSize(databaseSizeBeforeCreate + 1);
        PaymentFees testPaymentFees = paymentFeesList.get(paymentFeesList.size() - 1);
        assertThat(testPaymentFees.getPaymentMode()).isEqualTo(DEFAULT_PAYMENT_MODE);
        assertThat(testPaymentFees.getFees()).isEqualTo(DEFAULT_FEES);
    }

    @Test
    @Transactional
    void createPaymentFeesWithExistingId() throws Exception {
        // Create the PaymentFees with an existing ID
        paymentFees.setId(1L);

        int databaseSizeBeforeCreate = paymentFeesRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restPaymentFeesMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(paymentFees)))
            .andExpect(status().isBadRequest());

        // Validate the PaymentFees in the database
        List<PaymentFees> paymentFeesList = paymentFeesRepository.findAll();
        assertThat(paymentFeesList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkPaymentModeIsRequired() throws Exception {
        int databaseSizeBeforeTest = paymentFeesRepository.findAll().size();
        // set the field null
        paymentFees.setPaymentMode(null);

        // Create the PaymentFees, which fails.

        restPaymentFeesMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(paymentFees)))
            .andExpect(status().isBadRequest());

        List<PaymentFees> paymentFeesList = paymentFeesRepository.findAll();
        assertThat(paymentFeesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkFeesIsRequired() throws Exception {
        int databaseSizeBeforeTest = paymentFeesRepository.findAll().size();
        // set the field null
        paymentFees.setFees(null);

        // Create the PaymentFees, which fails.

        restPaymentFeesMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(paymentFees)))
            .andExpect(status().isBadRequest());

        List<PaymentFees> paymentFeesList = paymentFeesRepository.findAll();
        assertThat(paymentFeesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllPaymentFees() throws Exception {
        // Initialize the database
        paymentFeesRepository.saveAndFlush(paymentFees);

        // Get all the paymentFeesList
        restPaymentFeesMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(paymentFees.getId().intValue())))
            .andExpect(jsonPath("$.[*].paymentMode").value(hasItem(DEFAULT_PAYMENT_MODE.toString())))
            .andExpect(jsonPath("$.[*].fees").value(hasItem(DEFAULT_FEES.doubleValue())));
    }

    @Test
    @Transactional
    void getPaymentFees() throws Exception {
        // Initialize the database
        paymentFeesRepository.saveAndFlush(paymentFees);

        // Get the paymentFees
        restPaymentFeesMockMvc
            .perform(get(ENTITY_API_URL_ID, paymentFees.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(paymentFees.getId().intValue()))
            .andExpect(jsonPath("$.paymentMode").value(DEFAULT_PAYMENT_MODE.toString()))
            .andExpect(jsonPath("$.fees").value(DEFAULT_FEES.doubleValue()));
    }

    @Test
    @Transactional
    void getNonExistingPaymentFees() throws Exception {
        // Get the paymentFees
        restPaymentFeesMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewPaymentFees() throws Exception {
        // Initialize the database
        paymentFeesRepository.saveAndFlush(paymentFees);

        int databaseSizeBeforeUpdate = paymentFeesRepository.findAll().size();

        // Update the paymentFees
        PaymentFees updatedPaymentFees = paymentFeesRepository.findById(paymentFees.getId()).get();
        // Disconnect from session so that the updates on updatedPaymentFees are not directly saved in db
        em.detach(updatedPaymentFees);
        updatedPaymentFees.paymentMode(UPDATED_PAYMENT_MODE).fees(UPDATED_FEES);

        restPaymentFeesMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedPaymentFees.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedPaymentFees))
            )
            .andExpect(status().isOk());

        // Validate the PaymentFees in the database
        List<PaymentFees> paymentFeesList = paymentFeesRepository.findAll();
        assertThat(paymentFeesList).hasSize(databaseSizeBeforeUpdate);
        PaymentFees testPaymentFees = paymentFeesList.get(paymentFeesList.size() - 1);
        assertThat(testPaymentFees.getPaymentMode()).isEqualTo(UPDATED_PAYMENT_MODE);
        assertThat(testPaymentFees.getFees()).isEqualTo(UPDATED_FEES);
    }

    @Test
    @Transactional
    void putNonExistingPaymentFees() throws Exception {
        int databaseSizeBeforeUpdate = paymentFeesRepository.findAll().size();
        paymentFees.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPaymentFeesMockMvc
            .perform(
                put(ENTITY_API_URL_ID, paymentFees.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(paymentFees))
            )
            .andExpect(status().isBadRequest());

        // Validate the PaymentFees in the database
        List<PaymentFees> paymentFeesList = paymentFeesRepository.findAll();
        assertThat(paymentFeesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchPaymentFees() throws Exception {
        int databaseSizeBeforeUpdate = paymentFeesRepository.findAll().size();
        paymentFees.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPaymentFeesMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(paymentFees))
            )
            .andExpect(status().isBadRequest());

        // Validate the PaymentFees in the database
        List<PaymentFees> paymentFeesList = paymentFeesRepository.findAll();
        assertThat(paymentFeesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamPaymentFees() throws Exception {
        int databaseSizeBeforeUpdate = paymentFeesRepository.findAll().size();
        paymentFees.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPaymentFeesMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(paymentFees)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the PaymentFees in the database
        List<PaymentFees> paymentFeesList = paymentFeesRepository.findAll();
        assertThat(paymentFeesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdatePaymentFeesWithPatch() throws Exception {
        // Initialize the database
        paymentFeesRepository.saveAndFlush(paymentFees);

        int databaseSizeBeforeUpdate = paymentFeesRepository.findAll().size();

        // Update the paymentFees using partial update
        PaymentFees partialUpdatedPaymentFees = new PaymentFees();
        partialUpdatedPaymentFees.setId(paymentFees.getId());

        partialUpdatedPaymentFees.paymentMode(UPDATED_PAYMENT_MODE).fees(UPDATED_FEES);

        restPaymentFeesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPaymentFees.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPaymentFees))
            )
            .andExpect(status().isOk());

        // Validate the PaymentFees in the database
        List<PaymentFees> paymentFeesList = paymentFeesRepository.findAll();
        assertThat(paymentFeesList).hasSize(databaseSizeBeforeUpdate);
        PaymentFees testPaymentFees = paymentFeesList.get(paymentFeesList.size() - 1);
        assertThat(testPaymentFees.getPaymentMode()).isEqualTo(UPDATED_PAYMENT_MODE);
        assertThat(testPaymentFees.getFees()).isEqualTo(UPDATED_FEES);
    }

    @Test
    @Transactional
    void fullUpdatePaymentFeesWithPatch() throws Exception {
        // Initialize the database
        paymentFeesRepository.saveAndFlush(paymentFees);

        int databaseSizeBeforeUpdate = paymentFeesRepository.findAll().size();

        // Update the paymentFees using partial update
        PaymentFees partialUpdatedPaymentFees = new PaymentFees();
        partialUpdatedPaymentFees.setId(paymentFees.getId());

        partialUpdatedPaymentFees.paymentMode(UPDATED_PAYMENT_MODE).fees(UPDATED_FEES);

        restPaymentFeesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPaymentFees.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPaymentFees))
            )
            .andExpect(status().isOk());

        // Validate the PaymentFees in the database
        List<PaymentFees> paymentFeesList = paymentFeesRepository.findAll();
        assertThat(paymentFeesList).hasSize(databaseSizeBeforeUpdate);
        PaymentFees testPaymentFees = paymentFeesList.get(paymentFeesList.size() - 1);
        assertThat(testPaymentFees.getPaymentMode()).isEqualTo(UPDATED_PAYMENT_MODE);
        assertThat(testPaymentFees.getFees()).isEqualTo(UPDATED_FEES);
    }

    @Test
    @Transactional
    void patchNonExistingPaymentFees() throws Exception {
        int databaseSizeBeforeUpdate = paymentFeesRepository.findAll().size();
        paymentFees.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPaymentFeesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, paymentFees.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(paymentFees))
            )
            .andExpect(status().isBadRequest());

        // Validate the PaymentFees in the database
        List<PaymentFees> paymentFeesList = paymentFeesRepository.findAll();
        assertThat(paymentFeesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchPaymentFees() throws Exception {
        int databaseSizeBeforeUpdate = paymentFeesRepository.findAll().size();
        paymentFees.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPaymentFeesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(paymentFees))
            )
            .andExpect(status().isBadRequest());

        // Validate the PaymentFees in the database
        List<PaymentFees> paymentFeesList = paymentFeesRepository.findAll();
        assertThat(paymentFeesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamPaymentFees() throws Exception {
        int databaseSizeBeforeUpdate = paymentFeesRepository.findAll().size();
        paymentFees.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPaymentFeesMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(paymentFees))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the PaymentFees in the database
        List<PaymentFees> paymentFeesList = paymentFeesRepository.findAll();
        assertThat(paymentFeesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deletePaymentFees() throws Exception {
        // Initialize the database
        paymentFeesRepository.saveAndFlush(paymentFees);

        int databaseSizeBeforeDelete = paymentFeesRepository.findAll().size();

        // Delete the paymentFees
        restPaymentFeesMockMvc
            .perform(delete(ENTITY_API_URL_ID, paymentFees.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PaymentFees> paymentFeesList = paymentFeesRepository.findAll();
        assertThat(paymentFeesList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
