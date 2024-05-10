package com.example.fonet.repository;

import com.example.fonet.model.CardItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CardItemRepository extends JpaRepository<CardItem,Long> {
}
