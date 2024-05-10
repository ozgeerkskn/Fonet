package com.example.fonet.repository;

import com.example.fonet.model.FeatureCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FeatureCategoryRepository extends JpaRepository<FeatureCategory,Long> {

    List<FeatureCategory> findByRealEstateId(Long id);

}
