package com.example.fonet.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "featureCategory")
public class FeatureCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    @JsonIgnore
    @ManyToOne
    private RealEstate realEstate;
    @JsonIgnore
    @OneToMany(mappedBy = "category", cascade= CascadeType.ALL)
    private List<FeaturesItem>features=new ArrayList<>();
}
