package com.example.fonet.service;

import com.example.fonet.model.Category;
import com.example.fonet.model.Property;
import com.example.fonet.model.RealEstate;
import com.example.fonet.repository.PropertyRepository;
import com.example.fonet.request.CreatePropertyRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PropertyServiceImp implements PropertyService{

    @Autowired
    private PropertyRepository propertyRepository;

    @Override
    public Property createProperty(CreatePropertyRequest req, Category category, RealEstate realEstate) {
        Property property = new Property();
        property.setPropertyCategory(category);
        property.setRealEstate(realEstate);
        property.setDescription(req.getDescription());
        property.setImages(req.getImages());
        property.setName(req.getName());
        property.setPrice(req.getPrice());
        property.setFeatures(req.getFeatures());
        property.setSale(req.isSale());
      
        property.setCreationDate(new Date());
        property.setRent(req.isRent());

        Property savedProperty = propertyRepository.save(property);
        realEstate.getProperties().add(savedProperty);


        return savedProperty;
    }

    @Override
    public void deleteProperty(Long propertyId) throws Exception {

        Property property = findPropertyById(propertyId);
        property.setRealEstate(null);
        propertyRepository.save(property);

    }

    @Override
    public List<Property> getRealEstatesProperty(Long realEstateId,
                                                 boolean isRent,
                                                 boolean isNonRent,
                                                 boolean isSale, String propertyCategory) {

        List<Property> properties = propertyRepository.findByRealEstateId(realEstateId);

        if(isRent){
            properties=filterByRent(properties, isRent);
        }
        if(isNonRent){
            properties=filterByNonRent(properties,isNonRent);
        }
        if(isSale){
            properties=filterBySale(properties, isSale);
        }
        if(propertyCategory!=null && !propertyCategory.equals("")){
            properties=filterByCategory(properties,propertyCategory);

        }

        return properties;
    }

    private List<Property> filterByCategory(List<Property> properties, String propertyCategory) {
        return properties.stream().filter(property -> {
            if(property.getPropertyCategory()!=null){
                return property.getPropertyCategory().getName().equals(propertyCategory);
            }
            return false;
        }).collect(Collectors.toList());

    }

    private List<Property> filterBySale(List<Property> properties, boolean isSale) {
        return properties.stream().filter(property -> property.isSale()==isSale).collect(Collectors.toList());
    }

    private List<Property> filterByNonRent(List<Property> properties, boolean isNonRent) {
        return properties.stream().filter(property -> property.isRent()==false).collect(Collectors.toList());
    }

    private List<Property> filterByRent(List<Property> properties, boolean isRent) {
        return properties.stream().filter(property -> property.isRent()==isRent).collect(Collectors.toList());
    }

    @Override
    public List<Property> searchProperty(String keyword) {
        return propertyRepository.searchProperty(keyword);
    }

    @Override
    public Property findPropertyById(Long propertyId) throws Exception {
        Optional<Property> optionalProperty=propertyRepository.findById(propertyId);

        if(optionalProperty.isEmpty()){
            throw new Exception("Property not exist...");
        }
        return optionalProperty.get();
    }

    @Override
    public Property updateAvailabilityStatus(Long propertyId) throws Exception {
        Property property=findPropertyById(propertyId);
        property.setAvailable(!property.isAvailable());
        return propertyRepository.save(property);

    }
}
