package com.canyoncorp.canyonme.repository;

import com.canyoncorp.canyonme.domain.Picture;
import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

/**
 * Spring Data SQL repository for the Picture entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PictureRepository extends JpaRepository<Picture, Long> {
    @Query("select distinct picture from Picture picture where picture.product.id = ?1")
    List<Picture> findByProduct(Long productId);

    @Transactional
    @Modifying
    @Query("delete Picture picture where picture.product.id = ?1")
    void deleteAllByProductId(Long id);
}
