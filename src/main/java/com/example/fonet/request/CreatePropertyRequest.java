package com.example.fonet.request;


import com.example.fonet.model.Category;
import com.example.fonet.model.FeaturesItem;
import lombok.Data;

import java.util.List;

@Data
public class CreatePropertyRequest {

    private String name;
    private String description;
    private Long price;

    private Category category;
    private List<String>images;

    private Long realEstateId;
    private boolean rent;
    private boolean sale;
    private List<FeaturesItem> features;


}
