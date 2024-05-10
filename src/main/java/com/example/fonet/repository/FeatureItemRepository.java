package com.example.fonet.repository;

import com.example.fonet.model.FeaturesItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FeatureItemRepository extends JpaRepository<FeaturesItem,Long> {

    List<FeaturesItem> findByRealEstateId(Long id);


}
