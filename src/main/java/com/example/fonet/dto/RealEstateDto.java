package com.example.fonet.dto;


import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;
import java.util.List;
@Data
@Embeddable
public class RealEstateDto {

    private String real_estate_name;

    private String authorized_name;

    private String address;
    private String phone;

    @Column
    private List<String> images;

    private String title;
    private String description;
    private Long id;
}
