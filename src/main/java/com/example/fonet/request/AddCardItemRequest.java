package com.example.fonet.request;

import lombok.Data;

import java.util.List;

@Data
public class AddCardItemRequest {

    private Long propertyId;

    private int quantity;

    private List<String> features;


}
