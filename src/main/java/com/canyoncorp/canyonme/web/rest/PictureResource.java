package com.canyoncorp.canyonme.web.rest;

import com.canyoncorp.canyonme.domain.Picture;
import com.canyoncorp.canyonme.repository.PictureRepository;
import com.canyoncorp.canyonme.service.dto.PictureDTO;
import com.canyoncorp.canyonme.service.mapper.PictureMapper;
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
 * REST controller for managing {@link com.canyoncorp.canyonme.domain.Picture}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PictureResource {

    private final Logger log = LoggerFactory.getLogger(PictureResource.class);

    private static final String ENTITY_NAME = "picture";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PictureRepository pictureRepository;

    private final PictureMapper pictureMapper;

    public PictureResource(PictureRepository pictureRepository, PictureMapper pictureMapper) {
        this.pictureRepository = pictureRepository;
        this.pictureMapper = pictureMapper;
    }

    /**
     * {@code POST  /pictures} : Create a new picture.
     *
     * @param pictureDTO the pictureDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new pictureDTO, or with status {@code 400 (Bad Request)} if the picture has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/pictures")
    public ResponseEntity<PictureDTO> createPicture(@Valid @RequestBody PictureDTO pictureDTO) throws URISyntaxException {
        log.debug("REST request to save Picture : {}", pictureDTO);
        if (pictureDTO.getId() != null) {
            throw new BadRequestAlertException("A new picture cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Picture picture = pictureMapper.toEntity(pictureDTO);
        picture = pictureRepository.save(picture);
        PictureDTO result = pictureMapper.toDto(picture);
        return ResponseEntity
            .created(new URI("/api/pictures/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /pictures/:id} : Updates an existing picture.
     *
     * @param id the id of the pictureDTO to save.
     * @param pictureDTO the pictureDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated pictureDTO,
     * or with status {@code 400 (Bad Request)} if the pictureDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the pictureDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/pictures/{id}")
    public ResponseEntity<PictureDTO> updatePicture(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody PictureDTO pictureDTO
    ) throws URISyntaxException {
        log.debug("REST request to update Picture : {}, {}", id, pictureDTO);
        if (pictureDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, pictureDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!pictureRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Picture picture = pictureMapper.toEntity(pictureDTO);
        picture = pictureRepository.save(picture);
        PictureDTO result = pictureMapper.toDto(picture);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, pictureDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /pictures/:id} : Partial updates given fields of an existing picture, field will ignore if it is null
     *
     * @param id the id of the pictureDTO to save.
     * @param pictureDTO the pictureDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated pictureDTO,
     * or with status {@code 400 (Bad Request)} if the pictureDTO is not valid,
     * or with status {@code 404 (Not Found)} if the pictureDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the pictureDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/pictures/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<PictureDTO> partialUpdatePicture(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody PictureDTO pictureDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update Picture partially : {}, {}", id, pictureDTO);
        if (pictureDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, pictureDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!pictureRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<PictureDTO> result = pictureRepository
            .findById(pictureDTO.getId())
            .map(
                existingPicture -> {
                    pictureMapper.partialUpdate(existingPicture, pictureDTO);

                    return existingPicture;
                }
            )
            .map(pictureRepository::save)
            .map(pictureMapper::toDto);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, pictureDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /pictures} : get all the pictures.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of pictures in body.
     */
    @GetMapping("/pictures")
    public List<PictureDTO> getAllPictures() {
        log.debug("REST request to get all Pictures");
        List<Picture> pictures = pictureRepository.findAll();
        return pictureMapper.toDto(pictures);
    }

    /**
     * {@code GET  /pictures/:id} : get the "id" picture.
     *
     * @param id the id of the pictureDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the pictureDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/pictures/{id}")
    public ResponseEntity<PictureDTO> getPicture(@PathVariable Long id) {
        log.debug("REST request to get Picture : {}", id);
        Optional<PictureDTO> pictureDTO = pictureRepository.findById(id).map(pictureMapper::toDto);
        return ResponseUtil.wrapOrNotFound(pictureDTO);
    }

    /**
     * {@code DELETE  /pictures/:id} : delete the "id" picture.
     *
     * @param id the id of the pictureDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/pictures/{id}")
    public ResponseEntity<Void> deletePicture(@PathVariable Long id) {
        log.debug("REST request to delete Picture : {}", id);
        pictureRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
