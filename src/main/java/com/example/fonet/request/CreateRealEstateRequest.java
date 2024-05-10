package com.example.fonet.request;


import com.example.fonet.model.Address;
import com.example.fonet.model.ContactInformation;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class CreateRealEstateRequest {

    private Long id;
    private String name;
    private String description;
    private String propertyType;
    private Address address;
    private ContactInformation contactInformation;
    private String openingHours;
    private List<String> images;
}
