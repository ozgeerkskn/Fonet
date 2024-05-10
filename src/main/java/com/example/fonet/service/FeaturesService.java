package com.example.fonet.service;

import com.example.fonet.model.FeatureCategory;
import com.example.fonet.model.FeaturesItem;

import java.util.List;


public interface FeaturesService {

    public FeatureCategory createFeatureCategory(String name, Long realEstateId) throws Exception;

    public FeatureCategory findFeatureCategoryById(Long id) throws Exception;

    public List<FeatureCategory> findFeatureCategoryByRealEstateId(Long id) throws Exception;

    public FeaturesItem createFeatureItem(Long realEstateId, String featureName, Long categoryId) throws Exception;

    public List<FeaturesItem> findRealEstatesFeatures(Long realEstateId);

    public FeaturesItem updateStock(Long id) throws Exception;


}
