package com.example.fonet.request;


import lombok.Data;

@Data
public class FeatureRequest {

    private String name;
    private Long categoryId;
    private Long realEstateId;
}
