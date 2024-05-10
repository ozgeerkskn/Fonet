package com.example.fonet.service;

import com.example.fonet.model.Category;

import java.util.List;

public interface CategoryService {

    public Category createCategory(String name, Long userId) throws Exception;


    public List<Category> findCategoryByRealEstateId(Long id) throws Exception;


    public Category findCategoryById(Long id) throws Exception;
}
