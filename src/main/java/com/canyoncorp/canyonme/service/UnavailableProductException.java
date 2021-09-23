package com.canyoncorp.canyonme.service;

public class UnavailableProductException extends RuntimeException {

    public UnavailableProductException() {
        super("Product is un available");
    }
}
