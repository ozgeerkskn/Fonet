package com.example.fonet.repository;

import com.example.fonet.model.Property;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PropertyRepository extends JpaRepository<Property,Long> {

    List<Property> findByRealEstateId(Long realEstateId);

    @Query("SELECT p FROM Property p WHERE p.name LIKE %:keyword% OR p.propertyCategory.name LIKE %:keyword%")
    List<Property>searchProperty(@Param("keyword") String keyword);
}
