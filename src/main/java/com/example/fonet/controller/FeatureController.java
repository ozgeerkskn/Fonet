package com.example.fonet.controller;


import com.example.fonet.model.FeatureCategory;
import com.example.fonet.model.FeaturesItem;
import com.example.fonet.request.FeatureCategoryRequest;
import com.example.fonet.request.FeatureRequest;
import com.example.fonet.service.FeaturesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/features")
public class FeatureController {

    @Autowired
    private FeaturesService featuresService;


    @PostMapping("/category")
    public ResponseEntity<FeatureCategory>createFeatureCategory(
            @RequestBody FeatureCategoryRequest req
            ) throws Exception {
        FeatureCategory item=featuresService.createFeatureCategory(req.getName(), req.getRealEstateId());
        return new ResponseEntity<>(item, HttpStatus.CREATED);
    }

    @PostMapping()
    public ResponseEntity<FeaturesItem>createFeatureItem(
            @RequestBody FeatureRequest req
    ) throws Exception {
        FeaturesItem item=featuresService.createFeatureItem(req.getRealEstateId(),req.getName(),req.getCategoryId());
        return new ResponseEntity<>(item, HttpStatus.CREATED);
    }

    @PutMapping("/{id}/stoke")
    public ResponseEntity<FeaturesItem>updateFeatureStock(
            @PathVariable Long id
    ) throws Exception {
        FeaturesItem item=featuresService.updateStock(id);
        return new ResponseEntity<>(item, HttpStatus.OK);
    }

    @GetMapping("/realEstate/{id}")
    public ResponseEntity<List<FeaturesItem>> getRealEstateFeature(
            @PathVariable Long id
    ) throws Exception {
        List<FeaturesItem> items=featuresService.findRealEstatesFeatures(id);
        return new ResponseEntity<>(items, HttpStatus.OK);
    }

    @GetMapping("/realEstate/{id}/category")
    public ResponseEntity<List<FeatureCategory>> getRealEstateFeatureCategory(
            @PathVariable Long id
    ) throws Exception {
        List<FeatureCategory> items=featuresService.findFeatureCategoryByRealEstateId(id);
        return new ResponseEntity<>(items, HttpStatus.OK);
    }


}
