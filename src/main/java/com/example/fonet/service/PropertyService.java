package com.example.fonet.service;

import com.example.fonet.model.Category;
import com.example.fonet.model.Property;
import com.example.fonet.model.RealEstate;
import com.example.fonet.request.CreatePropertyRequest;

import java.util.List;


public interface PropertyService {

    public Property createProperty(CreatePropertyRequest req, Category category, RealEstate realEstate);

    void deleteProperty(Long propertyId) throws Exception;

    public List<Property> getRealEstatesProperty(Long realEstateId,boolean isRent,
                                                 boolean isNonRent, boolean isSale,
                                                 String propertyCategory);

    public List<Property> searchProperty(String keyword);
    public Property findPropertyById(Long propertyId) throws Exception;

    public Property updateAvailabilityStatus(Long propertyId) throws Exception;
}
