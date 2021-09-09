package com.canyoncorp.canyonme.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.canyoncorp.canyonme.IntegrationTest;
import com.canyoncorp.canyonme.domain.ShippingFees;
import com.canyoncorp.canyonme.domain.enumeration.ShippingMode;
import com.canyoncorp.canyonme.repository.ShippingFeesRepository;
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
 * Integration tests for the {@link ShippingFeesResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ShippingFeesResourceIT {

    private static final ShippingMode DEFAULT_SHIPPING_MODE = ShippingMode.DHL;
    private static final ShippingMode UPDATED_SHIPPING_MODE = ShippingMode.DHL;

    private static final Float DEFAULT_FEES = 1F;
    private static final Float UPDATED_FEES = 2F;

    private static final String ENTITY_API_URL = "/api/shipping-fees";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ShippingFeesRepository shippingFeesRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restShippingFeesMockMvc;

    private ShippingFees shippingFees;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ShippingFees createEntity(EntityManager em) {
        ShippingFees shippingFees = new ShippingFees().shippingMode(DEFAULT_SHIPPING_MODE).fees(DEFAULT_FEES);
        return shippingFees;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ShippingFees createUpdatedEntity(EntityManager em) {
        ShippingFees shippingFees = new ShippingFees().shippingMode(UPDATED_SHIPPING_MODE).fees(UPDATED_FEES);
        return shippingFees;
    }

    @BeforeEach
    public void initTest() {
        shippingFees = createEntity(em);
    }

    @Test
    @Transactional
    void createShippingFees() throws Exception {
        int databaseSizeBeforeCreate = shippingFeesRepository.findAll().size();
        // Create the ShippingFees
        restShippingFeesMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(shippingFees)))
            .andExpect(status().isCreated());

        // Validate the ShippingFees in the database
        List<ShippingFees> shippingFeesList = shippingFeesRepository.findAll();
        assertThat(shippingFeesList).hasSize(databaseSizeBeforeCreate + 1);
        ShippingFees testShippingFees = shippingFeesList.get(shippingFeesList.size() - 1);
        assertThat(testShippingFees.getShippingMode()).isEqualTo(DEFAULT_SHIPPING_MODE);
        assertThat(testShippingFees.getFees()).isEqualTo(DEFAULT_FEES);
    }

    @Test
    @Transactional
    void createShippingFeesWithExistingId() throws Exception {
        // Create the ShippingFees with an existing ID
        shippingFees.setId(1L);

        int databaseSizeBeforeCreate = shippingFeesRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restShippingFeesMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(shippingFees)))
            .andExpect(status().isBadRequest());

        // Validate the ShippingFees in the database
        List<ShippingFees> shippingFeesList = shippingFeesRepository.findAll();
        assertThat(shippingFeesList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkShippingModeIsRequired() throws Exception {
        int databaseSizeBeforeTest = shippingFeesRepository.findAll().size();
        // set the field null
        shippingFees.setShippingMode(null);

        // Create the ShippingFees, which fails.

        restShippingFeesMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(shippingFees)))
            .andExpect(status().isBadRequest());

        List<ShippingFees> shippingFeesList = shippingFeesRepository.findAll();
        assertThat(shippingFeesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkFeesIsRequired() throws Exception {
        int databaseSizeBeforeTest = shippingFeesRepository.findAll().size();
        // set the field null
        shippingFees.setFees(null);

        // Create the ShippingFees, which fails.

        restShippingFeesMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(shippingFees)))
            .andExpect(status().isBadRequest());

        List<ShippingFees> shippingFeesList = shippingFeesRepository.findAll();
        assertThat(shippingFeesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllShippingFees() throws Exception {
        // Initialize the database
        shippingFeesRepository.saveAndFlush(shippingFees);

        // Get all the shippingFeesList
        restShippingFeesMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(shippingFees.getId().intValue())))
            .andExpect(jsonPath("$.[*].shippingMode").value(hasItem(DEFAULT_SHIPPING_MODE.toString())))
            .andExpect(jsonPath("$.[*].fees").value(hasItem(DEFAULT_FEES.doubleValue())));
    }

    @Test
    @Transactional
    void getShippingFees() throws Exception {
        // Initialize the database
        shippingFeesRepository.saveAndFlush(shippingFees);

        // Get the shippingFees
        restShippingFeesMockMvc
            .perform(get(ENTITY_API_URL_ID, shippingFees.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(shippingFees.getId().intValue()))
            .andExpect(jsonPath("$.shippingMode").value(DEFAULT_SHIPPING_MODE.toString()))
            .andExpect(jsonPath("$.fees").value(DEFAULT_FEES.doubleValue()));
    }

    @Test
    @Transactional
    void getNonExistingShippingFees() throws Exception {
        // Get the shippingFees
        restShippingFeesMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewShippingFees() throws Exception {
        // Initialize the database
        shippingFeesRepository.saveAndFlush(shippingFees);

        int databaseSizeBeforeUpdate = shippingFeesRepository.findAll().size();

        // Update the shippingFees
        ShippingFees updatedShippingFees = shippingFeesRepository.findById(shippingFees.getId()).get();
        // Disconnect from session so that the updates on updatedShippingFees are not directly saved in db
        em.detach(updatedShippingFees);
        updatedShippingFees.shippingMode(UPDATED_SHIPPING_MODE).fees(UPDATED_FEES);

        restShippingFeesMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedShippingFees.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedShippingFees))
            )
            .andExpect(status().isOk());

        // Validate the ShippingFees in the database
        List<ShippingFees> shippingFeesList = shippingFeesRepository.findAll();
        assertThat(shippingFeesList).hasSize(databaseSizeBeforeUpdate);
        ShippingFees testShippingFees = shippingFeesList.get(shippingFeesList.size() - 1);
        assertThat(testShippingFees.getShippingMode()).isEqualTo(UPDATED_SHIPPING_MODE);
        assertThat(testShippingFees.getFees()).isEqualTo(UPDATED_FEES);
    }

    @Test
    @Transactional
    void putNonExistingShippingFees() throws Exception {
        int databaseSizeBeforeUpdate = shippingFeesRepository.findAll().size();
        shippingFees.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restShippingFeesMockMvc
            .perform(
                put(ENTITY_API_URL_ID, shippingFees.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(shippingFees))
            )
            .andExpect(status().isBadRequest());

        // Validate the ShippingFees in the database
        List<ShippingFees> shippingFeesList = shippingFeesRepository.findAll();
        assertThat(shippingFeesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchShippingFees() throws Exception {
        int databaseSizeBeforeUpdate = shippingFeesRepository.findAll().size();
        shippingFees.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restShippingFeesMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(shippingFees))
            )
            .andExpect(status().isBadRequest());

        // Validate the ShippingFees in the database
        List<ShippingFees> shippingFeesList = shippingFeesRepository.findAll();
        assertThat(shippingFeesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamShippingFees() throws Exception {
        int databaseSizeBeforeUpdate = shippingFeesRepository.findAll().size();
        shippingFees.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restShippingFeesMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(shippingFees)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the ShippingFees in the database
        List<ShippingFees> shippingFeesList = shippingFeesRepository.findAll();
        assertThat(shippingFeesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateShippingFeesWithPatch() throws Exception {
        // Initialize the database
        shippingFeesRepository.saveAndFlush(shippingFees);

        int databaseSizeBeforeUpdate = shippingFeesRepository.findAll().size();

        // Update the shippingFees using partial update
        ShippingFees partialUpdatedShippingFees = new ShippingFees();
        partialUpdatedShippingFees.setId(shippingFees.getId());

        partialUpdatedShippingFees.shippingMode(UPDATED_SHIPPING_MODE);

        restShippingFeesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedShippingFees.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedShippingFees))
            )
            .andExpect(status().isOk());

        // Validate the ShippingFees in the database
        List<ShippingFees> shippingFeesList = shippingFeesRepository.findAll();
        assertThat(shippingFeesList).hasSize(databaseSizeBeforeUpdate);
        ShippingFees testShippingFees = shippingFeesList.get(shippingFeesList.size() - 1);
        assertThat(testShippingFees.getShippingMode()).isEqualTo(UPDATED_SHIPPING_MODE);
        assertThat(testShippingFees.getFees()).isEqualTo(DEFAULT_FEES);
    }

    @Test
    @Transactional
    void fullUpdateShippingFeesWithPatch() throws Exception {
        // Initialize the database
        shippingFeesRepository.saveAndFlush(shippingFees);

        int databaseSizeBeforeUpdate = shippingFeesRepository.findAll().size();

        // Update the shippingFees using partial update
        ShippingFees partialUpdatedShippingFees = new ShippingFees();
        partialUpdatedShippingFees.setId(shippingFees.getId());

        partialUpdatedShippingFees.shippingMode(UPDATED_SHIPPING_MODE).fees(UPDATED_FEES);

        restShippingFeesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedShippingFees.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedShippingFees))
            )
            .andExpect(status().isOk());

        // Validate the ShippingFees in the database
        List<ShippingFees> shippingFeesList = shippingFeesRepository.findAll();
        assertThat(shippingFeesList).hasSize(databaseSizeBeforeUpdate);
        ShippingFees testShippingFees = shippingFeesList.get(shippingFeesList.size() - 1);
        assertThat(testShippingFees.getShippingMode()).isEqualTo(UPDATED_SHIPPING_MODE);
        assertThat(testShippingFees.getFees()).isEqualTo(UPDATED_FEES);
    }

    @Test
    @Transactional
    void patchNonExistingShippingFees() throws Exception {
        int databaseSizeBeforeUpdate = shippingFeesRepository.findAll().size();
        shippingFees.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restShippingFeesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, shippingFees.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(shippingFees))
            )
            .andExpect(status().isBadRequest());

        // Validate the ShippingFees in the database
        List<ShippingFees> shippingFeesList = shippingFeesRepository.findAll();
        assertThat(shippingFeesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchShippingFees() throws Exception {
        int databaseSizeBeforeUpdate = shippingFeesRepository.findAll().size();
        shippingFees.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restShippingFeesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(shippingFees))
            )
            .andExpect(status().isBadRequest());

        // Validate the ShippingFees in the database
        List<ShippingFees> shippingFeesList = shippingFeesRepository.findAll();
        assertThat(shippingFeesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamShippingFees() throws Exception {
        int databaseSizeBeforeUpdate = shippingFeesRepository.findAll().size();
        shippingFees.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restShippingFeesMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(shippingFees))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ShippingFees in the database
        List<ShippingFees> shippingFeesList = shippingFeesRepository.findAll();
        assertThat(shippingFeesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteShippingFees() throws Exception {
        // Initialize the database
        shippingFeesRepository.saveAndFlush(shippingFees);

        int databaseSizeBeforeDelete = shippingFeesRepository.findAll().size();

        // Delete the shippingFees
        restShippingFeesMockMvc
            .perform(delete(ENTITY_API_URL_ID, shippingFees.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ShippingFees> shippingFeesList = shippingFeesRepository.findAll();
        assertThat(shippingFeesList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
