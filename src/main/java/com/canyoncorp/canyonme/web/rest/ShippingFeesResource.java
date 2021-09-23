package com.canyoncorp.canyonme.web.rest;

import com.canyoncorp.canyonme.domain.ShippingFees;
import com.canyoncorp.canyonme.repository.ShippingFeesRepository;
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
 * REST controller for managing {@link com.canyoncorp.canyonme.domain.ShippingFees}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ShippingFeesResource {

    private final Logger log = LoggerFactory.getLogger(ShippingFeesResource.class);

    private static final String ENTITY_NAME = "shippingFees";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ShippingFeesRepository shippingFeesRepository;

    public ShippingFeesResource(ShippingFeesRepository shippingFeesRepository) {
        this.shippingFeesRepository = shippingFeesRepository;
    }

    /**
     * {@code POST  /shipping-fees} : Create a new shippingFees.
     *
     * @param shippingFees the shippingFees to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new shippingFees, or with status {@code 400 (Bad Request)} if the shippingFees has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/shipping-fees")
    public ResponseEntity<ShippingFees> createShippingFees(@Valid @RequestBody ShippingFees shippingFees) throws URISyntaxException {
        log.debug("REST request to save ShippingFees : {}", shippingFees);
        if (shippingFees.getId() != null) {
            throw new BadRequestAlertException("A new shippingFees cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ShippingFees result = shippingFeesRepository.save(shippingFees);
        return ResponseEntity
            .created(new URI("/api/shipping-fees/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /shipping-fees/:id} : Updates an existing shippingFees.
     *
     * @param id the id of the shippingFees to save.
     * @param shippingFees the shippingFees to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated shippingFees,
     * or with status {@code 400 (Bad Request)} if the shippingFees is not valid,
     * or with status {@code 500 (Internal Server Error)} if the shippingFees couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/shipping-fees/{id}")
    public ResponseEntity<ShippingFees> updateShippingFees(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody ShippingFees shippingFees
    ) throws URISyntaxException {
        log.debug("REST request to update ShippingFees : {}, {}", id, shippingFees);
        if (shippingFees.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, shippingFees.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!shippingFeesRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        ShippingFees result = shippingFeesRepository.save(shippingFees);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, shippingFees.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /shipping-fees/:id} : Partial updates given fields of an existing shippingFees, field will ignore if it is null
     *
     * @param id the id of the shippingFees to save.
     * @param shippingFees the shippingFees to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated shippingFees,
     * or with status {@code 400 (Bad Request)} if the shippingFees is not valid,
     * or with status {@code 404 (Not Found)} if the shippingFees is not found,
     * or with status {@code 500 (Internal Server Error)} if the shippingFees couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/shipping-fees/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<ShippingFees> partialUpdateShippingFees(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody ShippingFees shippingFees
    ) throws URISyntaxException {
        log.debug("REST request to partial update ShippingFees partially : {}, {}", id, shippingFees);
        if (shippingFees.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, shippingFees.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!shippingFeesRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ShippingFees> result = shippingFeesRepository
            .findById(shippingFees.getId())
            .map(
                existingShippingFees -> {
                    if (shippingFees.getShippingMode() != null) {
                        existingShippingFees.setShippingMode(shippingFees.getShippingMode());
                    }
                    if (shippingFees.getFees() != null) {
                        existingShippingFees.setFees(shippingFees.getFees());
                    }

                    return existingShippingFees;
                }
            )
            .map(shippingFeesRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, shippingFees.getId().toString())
        );
    }

    /**
     * {@code GET  /shipping-fees} : get all the shippingFees.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of shippingFees in body.
     */
    @GetMapping("/shipping-fees")
    public List<ShippingFees> getAllShippingFees() {
        log.debug("REST request to get all ShippingFees");
        return shippingFeesRepository.findAll();
    }

    /**
     * {@code GET  /shipping-fees/:id} : get the "id" shippingFees.
     *
     * @param id the id of the shippingFees to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the shippingFees, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/shipping-fees/{id}")
    public ResponseEntity<ShippingFees> getShippingFees(@PathVariable Long id) {
        log.debug("REST request to get ShippingFees : {}", id);
        Optional<ShippingFees> shippingFees = shippingFeesRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(shippingFees);
    }

    /**
     * {@code DELETE  /shipping-fees/:id} : delete the "id" shippingFees.
     *
     * @param id the id of the shippingFees to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/shipping-fees/{id}")
    public ResponseEntity<Void> deleteShippingFees(@PathVariable Long id) {
        log.debug("REST request to delete ShippingFees : {}", id);
        shippingFeesRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
