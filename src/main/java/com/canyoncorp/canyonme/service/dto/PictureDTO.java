package com.canyoncorp.canyonme.service.dto;

import java.io.Serializable;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.canyoncorp.canyonme.domain.Picture} entity.
 */
public class PictureDTO implements Serializable {

    private Long id;

    @NotNull
    private String link;

    // private ProductDTO product;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    /*
    public ProductDTO getProduct() {
        return product;
    }

    public void setProduct(ProductDTO product) {
        this.product = product;
    }
    */

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PictureDTO)) {
            return false;
        }

        PictureDTO pictureDTO = (PictureDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, pictureDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PictureDTO{" +
            "id=" + getId() +
            ", link='" + getLink() + "'" +
            // ", product=" + getProduct() +
            "}";
    }
}
