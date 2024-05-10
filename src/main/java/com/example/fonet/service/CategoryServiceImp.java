package com.example.fonet.service;

import com.example.fonet.model.Category;
import com.example.fonet.model.RealEstate;
import com.example.fonet.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class CategoryServiceImp implements CategoryService{

    @Autowired
    private RealEstateService realEstateService;

    @Autowired
    private CategoryRepository categoryRepository;


    @Override
    public Category createCategory(String name, Long userId) throws Exception {
        RealEstate realEstate = realEstateService.getRealEstateByUserId(userId);
        Category category=new Category();
        category.setName(name);
        category.setRealEstate(realEstate);

        return categoryRepository.save(category);
    }

    @Override
    public List<Category> findCategoryByRealEstateId(Long id) throws Exception {
        RealEstate realEstate=realEstateService.getRealEstateByUserId(id);

        return categoryRepository.findByRealEstateId(id);
    }

    @Override
    public Category findCategoryById(Long id) throws Exception {
        Optional<Category> optionalCategory=categoryRepository.findById(id);

        if(optionalCategory.isEmpty()){
            throw new Exception("Category not found");
        }
        return optionalCategory.get();
    }
}
