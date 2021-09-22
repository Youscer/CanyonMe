package com.canyoncorp.canyonme.web.rest.vm;

public class PictureVM {

    private Long productId;
    private String link;

    public PictureVM(Long productId, String link) {
        this.productId = productId;
        this.link = link;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }
}
