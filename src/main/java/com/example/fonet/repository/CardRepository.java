package com.example.fonet.repository;

import com.example.fonet.model.Card;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CardRepository extends JpaRepository<Card,Long>{

    public Card findByCustomerId(Long userId);
}
