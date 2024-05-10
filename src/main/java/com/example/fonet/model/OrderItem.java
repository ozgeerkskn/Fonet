package com.example.fonet.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "orderItems")
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    private Property property; //Genel anlamda tüm gayrimenkuller(ev, ofis, mağaza, arsa,...)

    private int quantity;

    private Long totalPrice;

    private List<String> features;
}
