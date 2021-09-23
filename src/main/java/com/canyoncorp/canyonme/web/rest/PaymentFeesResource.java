package com.canyoncorp.canyonme.web.rest;

import com.canyoncorp.canyonme.domain.PaymentFees;
import com.canyoncorp.canyonme.repository.PaymentFeesRepository;
import com.canyoncorp.canyonme.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.canyoncorp.canyonme.domain.PaymentFees}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PaymentFeesResource {

    private final Logger log = LoggerFactory.getLogger(PaymentFeesResource.class);

    private static final String ENTITY_NAME = "paymentFees";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PaymentFeesRepository paymentFeesRepository;

    public PaymentFeesResource(PaymentFeesRepository paymentFeesRepository) {
        this.paymentFeesRepository = paymentFeesRepository;
    }

    /**
     * {@code POST  /payment-fees} : Create a new paymentFees.
     *
     * @param paymentFees the paymentFees to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new paymentFees, or with status {@code 400 (Bad Request)} if the paymentFees has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/payment-fees")
    public ResponseEntity<PaymentFees> createPaymentFees(@Valid @RequestBody PaymentFees paymentFees) throws URISyntaxException {
        log.debug("REST request to save PaymentFees : {}", paymentFees);
        if (paymentFees.getId() != null) {
            throw new BadRequestAlertException("A new paymentFees cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PaymentFees result = paymentFeesRepository.save(paymentFees);
        return ResponseEntity
            .created(new URI("/api/payment-fees/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /payment-fees/:id} : Updates an existing paymentFees.
     *
     * @param id the id of the paymentFees to save.
     * @param paymentFees the paymentFees to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated paymentFees,
     * or with status {@code 400 (Bad Request)} if the paymentFees is not valid,
     * or with status {@code 500 (Internal Server Error)} if the paymentFees couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/payment-fees/{id}")
    public ResponseEntity<PaymentFees> updatePaymentFees(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody PaymentFees paymentFees
    ) throws URISyntaxException {
        log.debug("REST request to update PaymentFees : {}, {}", id, paymentFees);
        if (paymentFees.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, paymentFees.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!paymentFeesRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        PaymentFees result = paymentFeesRepository.save(paymentFees);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, paymentFees.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /payment-fees/:id} : Partial updates given fields of an existing paymentFees, field will ignore if it is null
     *
     * @param id the id of the paymentFees to save.
     * @param paymentFees the paymentFees to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated paymentFees,
     * or with status {@code 400 (Bad Request)} if the paymentFees is not valid,
     * or with status {@code 404 (Not Found)} if the paymentFees is not found,
     * or with status {@code 500 (Internal Server Error)} if the paymentFees couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/payment-fees/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<PaymentFees> partialUpdatePaymentFees(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody PaymentFees paymentFees
    ) throws URISyntaxException {
        log.debug("REST request to partial update PaymentFees partially : {}, {}", id, paymentFees);
        if (paymentFees.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, paymentFees.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!paymentFeesRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<PaymentFees> result = paymentFeesRepository
            .findById(paymentFees.getId())
            .map(
                existingPaymentFees -> {
                    if (paymentFees.getPaymentMode() != null) {
                        existingPaymentFees.setPaymentMode(paymentFees.getPaymentMode());
                    }
                    if (paymentFees.getFees() != null) {
                        existingPaymentFees.setFees(paymentFees.getFees());
                    }

                    return existingPaymentFees;
                }
            )
            .map(paymentFeesRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, paymentFees.getId().toString())
        );
    }

    /**
     * {@code GET  /payment-fees} : get all the paymentFees.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of paymentFees in body.
     */
    @GetMapping("/payment-fees")
    public List<PaymentFees> getAllPaymentFees() {
        log.debug("REST request to get all PaymentFees");
        return paymentFeesRepository.findAll();
    }

    /**
     * {@code GET  /payment-fees/:id} : get the "id" paymentFees.
     *
     * @param id the id of the paymentFees to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the paymentFees, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/payment-fees/{id}")
    public ResponseEntity<PaymentFees> getPaymentFees(@PathVariable Long id) {
        log.debug("REST request to get PaymentFees : {}", id);
        Optional<PaymentFees> paymentFees = paymentFeesRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(paymentFees);
    }

    /**
     * {@code DELETE  /payment-fees/:id} : delete the "id" paymentFees.
     *
     * @param id the id of the paymentFees to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/payment-fees/{id}")
    public ResponseEntity<Void> deletePaymentFees(@PathVariable Long id) {
        log.debug("REST request to delete PaymentFees : {}", id);
        paymentFeesRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
