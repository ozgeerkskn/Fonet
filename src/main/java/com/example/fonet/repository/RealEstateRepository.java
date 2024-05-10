package com.example.fonet.repository;

import com.example.fonet.model.RealEstate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RealEstateRepository extends JpaRepository<RealEstate,Long> {

    @Query("SELECT r FROM RealEstate r WHERE lower(r.name) LIKE lower(concat('%',:query, '%')) " +
            "OR lower(r.propertyType) LIKE lower(concat('%', :query, '%'))")
    List<RealEstate> findBySearchQuery(String query);
    RealEstate findByOwnerId(Long userId);

}
