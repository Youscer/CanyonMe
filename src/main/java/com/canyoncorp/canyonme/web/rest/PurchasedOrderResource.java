package com.canyoncorp.canyonme.web.rest;

import com.canyoncorp.canyonme.domain.PurchasedOrder;
import com.canyoncorp.canyonme.repository.PurchasedOrderRepository;
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
 * REST controller for managing {@link com.canyoncorp.canyonme.domain.PurchasedOrder}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PurchasedOrderResource {

    private final Logger log = LoggerFactory.getLogger(PurchasedOrderResource.class);

    private static final String ENTITY_NAME = "purchasedOrder";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PurchasedOrderRepository purchasedOrderRepository;

    public PurchasedOrderResource(PurchasedOrderRepository purchasedOrderRepository) {
        this.purchasedOrderRepository = purchasedOrderRepository;
    }

    /**
     * {@code POST  /purchased-orders} : Create a new purchasedOrder.
     *
     * @param purchasedOrder the purchasedOrder to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new purchasedOrder, or with status {@code 400 (Bad Request)} if the purchasedOrder has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/purchased-orders")
    public ResponseEntity<PurchasedOrder> createPurchasedOrder(@Valid @RequestBody PurchasedOrder purchasedOrder)
        throws URISyntaxException {
        log.debug("REST request to save PurchasedOrder : {}", purchasedOrder);
        if (purchasedOrder.getId() != null) {
            throw new BadRequestAlertException("A new purchasedOrder cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PurchasedOrder result = purchasedOrderRepository.save(purchasedOrder);
        return ResponseEntity
            .created(new URI("/api/purchased-orders/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /purchased-orders/:id} : Updates an existing purchasedOrder.
     *
     * @param id the id of the purchasedOrder to save.
     * @param purchasedOrder the purchasedOrder to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated purchasedOrder,
     * or with status {@code 400 (Bad Request)} if the purchasedOrder is not valid,
     * or with status {@code 500 (Internal Server Error)} if the purchasedOrder couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/purchased-orders/{id}")
    public ResponseEntity<PurchasedOrder> updatePurchasedOrder(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody PurchasedOrder purchasedOrder
    ) throws URISyntaxException {
        log.debug("REST request to update PurchasedOrder : {}, {}", id, purchasedOrder);
        if (purchasedOrder.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, purchasedOrder.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!purchasedOrderRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        PurchasedOrder result = purchasedOrderRepository.save(purchasedOrder);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, purchasedOrder.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /purchased-orders/:id} : Partial updates given fields of an existing purchasedOrder, field will ignore if it is null
     *
     * @param id the id of the purchasedOrder to save.
     * @param purchasedOrder the purchasedOrder to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated purchasedOrder,
     * or with status {@code 400 (Bad Request)} if the purchasedOrder is not valid,
     * or with status {@code 404 (Not Found)} if the purchasedOrder is not found,
     * or with status {@code 500 (Internal Server Error)} if the purchasedOrder couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/purchased-orders/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<PurchasedOrder> partialUpdatePurchasedOrder(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody PurchasedOrder purchasedOrder
    ) throws URISyntaxException {
        log.debug("REST request to partial update PurchasedOrder partially : {}, {}", id, purchasedOrder);
        if (purchasedOrder.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, purchasedOrder.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!purchasedOrderRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<PurchasedOrder> result = purchasedOrderRepository
            .findById(purchasedOrder.getId())
            .map(
                existingPurchasedOrder -> {
                    if (purchasedOrder.getOrderDate() != null) {
                        existingPurchasedOrder.setOrderDate(purchasedOrder.getOrderDate());
                    }
                    if (purchasedOrder.getOrderState() != null) {
                        existingPurchasedOrder.setOrderState(purchasedOrder.getOrderState());
                    }
                    if (purchasedOrder.getShippingMode() != null) {
                        existingPurchasedOrder.setShippingMode(purchasedOrder.getShippingMode());
                    }
                    if (purchasedOrder.getShippingFees() != null) {
                        existingPurchasedOrder.setShippingFees(purchasedOrder.getShippingFees());
                    }
                    if (purchasedOrder.getPaymentMode() != null) {
                        existingPurchasedOrder.setPaymentMode(purchasedOrder.getPaymentMode());
                    }
                    if (purchasedOrder.getPaymentFees() != null) {
                        existingPurchasedOrder.setPaymentFees(purchasedOrder.getPaymentFees());
                    }

                    return existingPurchasedOrder;
                }
            )
            .map(purchasedOrderRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, purchasedOrder.getId().toString())
        );
    }

    /**
     * {@code GET  /purchased-orders} : get all the purchasedOrders.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of purchasedOrders in body.
     */
    @GetMapping("/purchased-orders")
    public List<PurchasedOrder> getAllPurchasedOrders() {
        log.debug("REST request to get all PurchasedOrders");
        return purchasedOrderRepository.findAll();
    }

    /**
     * {@code GET  /purchased-orders/:id} : get the "id" purchasedOrder.
     *
     * @param id the id of the purchasedOrder to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the purchasedOrder, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/purchased-orders/{id}")
    public ResponseEntity<PurchasedOrder> getPurchasedOrder(@PathVariable Long id) {
        log.debug("REST request to get PurchasedOrder : {}", id);
        Optional<PurchasedOrder> purchasedOrder = purchasedOrderRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(purchasedOrder);
    }

    /**
     * {@code DELETE  /purchased-orders/:id} : delete the "id" purchasedOrder.
     *
     * @param id the id of the purchasedOrder to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/purchased-orders/{id}")
    public ResponseEntity<Void> deletePurchasedOrder(@PathVariable Long id) {
        log.debug("REST request to delete PurchasedOrder : {}", id);
        purchasedOrderRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
