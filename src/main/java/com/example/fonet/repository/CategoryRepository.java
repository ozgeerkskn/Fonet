package com.example.fonet.repository;

import com.example.fonet.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    public List<Category>findByRealEstateId(Long id);
}
