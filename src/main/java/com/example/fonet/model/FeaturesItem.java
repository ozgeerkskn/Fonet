package com.example.fonet.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "featuresItems")
public class FeaturesItem {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    @ManyToOne
    private FeatureCategory category;

    @JsonIgnore
    @ManyToOne
    private RealEstate realEstate;

    private boolean inStoke=true; // Gayrimenkul kiralanmak ya da satılmak için müsait durumda mı? İçi boş mu?

}
