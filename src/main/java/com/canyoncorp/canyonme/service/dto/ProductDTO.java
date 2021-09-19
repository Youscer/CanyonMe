package com.canyoncorp.canyonme.service.dto;

import com.canyoncorp.canyonme.domain.Picture;
import com.canyoncorp.canyonme.service.mapper.PictureVMMapper;
import com.canyoncorp.canyonme.web.rest.vm.PictureVM;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.canyoncorp.canyonme.domain.Product} entity.
 */
public class ProductDTO implements Serializable {

    // @NotNull
    private Long id;

    @NotNull
    private String name;

    private String brand;

    @NotNull
    private String description;

    @NotNull
    private Float unitPrice;

    private Integer quantity;

    private List<PictureVM> pictures;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Float getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(Float unitPrice) {
        this.unitPrice = unitPrice;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public List<PictureVM> getPictures() {
        return pictures;
    }

    public void setPictures(List<PictureDTO> pictures) {
        List<PictureVM> pictureVMS = new ArrayList<>();
        for (PictureDTO pictureDTO : pictures) pictureVMS.add(PictureVMMapper.INSTANCE.DTOtoVM(pictureDTO));
        this.pictures = pictureVMS;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ProductDTO)) {
            return false;
        }

        ProductDTO productDTO = (ProductDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, productDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ProductDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", brand='" + getBrand() + "'" +
            ", description='" + getDescription() + "'" +
            ", unitPrice=" + getUnitPrice() +
            ", quantity=" + getQuantity() +
            "}";
    }
}
