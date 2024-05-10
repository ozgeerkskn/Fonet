package com.example.fonet.controller;

import com.example.fonet.model.Property;
import com.example.fonet.model.User;
import com.example.fonet.service.PropertyService;
import com.example.fonet.service.RealEstateService;
import com.example.fonet.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/property")
public class PropertyController {

        @Autowired
        private PropertyService propertyService;

        @Autowired
        private UserService userService;

        @Autowired
        private RealEstateService realEstateService;


        @GetMapping("/search")
        public ResponseEntity<List<Property>> searchProperty(@RequestParam String name,
                                                       @RequestHeader("Authorization") String jwt) throws Exception {
            User user = userService.findUserByJwtToken(jwt);

            List<Property> properties = propertyService.searchProperty(name);

            return new ResponseEntity<>(properties, HttpStatus.CREATED);
        }

    @GetMapping("/realEstate/{realEstateId}")
    public ResponseEntity<List<Property>> getRealEstateProperty(
            @RequestParam (required = false) boolean rent,
            @RequestParam (required = false) boolean sale,
            @RequestParam (required = false) boolean nonrent,
            @RequestParam(required = false) String property_category,
            @PathVariable Long realEstateId,
            @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);

        List<Property> properties = propertyService.getRealEstatesProperty(realEstateId,rent,nonrent,sale,property_category);

        return new ResponseEntity<>(properties, HttpStatus.OK);
    }

    }
