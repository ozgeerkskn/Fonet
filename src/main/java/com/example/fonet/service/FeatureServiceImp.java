package com.example.fonet.service;


import com.example.fonet.model.FeatureCategory;
import com.example.fonet.model.FeaturesItem;
import com.example.fonet.model.RealEstate;
import com.example.fonet.repository.FeatureCategoryRepository;
import com.example.fonet.repository.FeatureItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FeatureServiceImp implements FeaturesService{

    @Autowired
    private FeatureItemRepository featureItemRepository;

    @Autowired
    private FeatureCategoryRepository featureCategoryRepository;

    @Autowired
    private RealEstateService realEstateService;


    @Override
    public FeatureCategory createFeatureCategory(String name, Long realEstateId) throws Exception {

        RealEstate realEstate=realEstateService.findRealEstateById(realEstateId);
        FeatureCategory category=new FeatureCategory();
        category.setRealEstate(realEstate);
        category.setName(name);


        return featureCategoryRepository.save(category);
    }

    @Override
    public FeatureCategory findFeatureCategoryById(Long id) throws Exception {

        Optional<FeatureCategory> opt=featureCategoryRepository.findById(id);

        if(opt.isEmpty()){
            throw new Exception("Feature category not found");
        }
        return opt.get();
    }

    @Override
    public List<FeatureCategory> findFeatureCategoryByRealEstateId(Long id) throws Exception {
        realEstateService.findRealEstateById(id);
        return featureCategoryRepository.findByRealEstateId(id);
    }

    @Override
    public FeaturesItem createFeatureItem(Long realEstateId, String featureName, Long categoryId) throws Exception {

        RealEstate realEstate=realEstateService.findRealEstateById(realEstateId);
        FeatureCategory category=findFeatureCategoryById(categoryId);

        FeaturesItem item=new FeaturesItem();
        item.setName(featureName);
        item.setRealEstate(realEstate);
        item.setCategory(category);

        FeaturesItem feature=featureItemRepository.save(item);
        category.getFeatures().add(feature);

        return feature;
    }

    @Override
    public List<FeaturesItem> findRealEstatesFeatures(Long realEstateId) {
        return featureItemRepository.findByRealEstateId(realEstateId);
    }

    @Override
    public FeaturesItem updateStock(Long id) throws Exception {
        Optional<FeaturesItem> optionalFeaturesItem=featureItemRepository.findById(id);

        if(optionalFeaturesItem.isEmpty()){
            throw new Exception("Feature not found");
        }

       FeaturesItem featuresItem=optionalFeaturesItem.get();
       featuresItem.setInStoke(!featuresItem.isInStoke());
        return featureItemRepository.save(featuresItem);
    }
}
