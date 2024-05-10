package com.example.fonet.controller;

import com.example.fonet.dto.RealEstateDto;
import com.example.fonet.model.RealEstate;
import com.example.fonet.model.User;
import com.example.fonet.request.CreateRealEstateRequest;
import com.example.fonet.service.RealEstateService;
import com.example.fonet.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/realEstates")
public class RealEstateController {

    @Autowired
    private RealEstateService realEstateService;

    @Autowired
    private UserService userService;


    @GetMapping("/search")
    public ResponseEntity<List<RealEstate>>searchRealEstate(
            @RequestHeader("Authorization") String jwt,
            @RequestParam String keyword
    ) throws Exception {
        User user=userService.findUserByJwtToken(jwt);

        List<RealEstate> realEstate=realEstateService.searchRealEstate(keyword);
        return new ResponseEntity<>(realEstate, HttpStatus.OK);
    }

    @GetMapping()
    public ResponseEntity<List<RealEstate>>getAllRealEstate(
            @RequestHeader("Authorization") String jwt
    ) throws Exception {
        User user=userService.findUserByJwtToken(jwt);

        List<RealEstate> realEstate=realEstateService.getAllRealEstate();
        return new ResponseEntity<>(realEstate, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RealEstate>findRealEstateById(
            @RequestHeader("Authorization") String jwt,
            @PathVariable Long id
    ) throws Exception {
        User user=userService.findUserByJwtToken(jwt);

        RealEstate realEstate=realEstateService.findRealEstateById(id);
        return new ResponseEntity<>(realEstate, HttpStatus.OK);
    }

    @PutMapping("/{id}/add-favorites")
    public ResponseEntity<RealEstateDto>addToFavorites(
            @RequestHeader("Authorization") String jwt,
            @PathVariable Long id
    ) throws Exception {
        User user=userService.findUserByJwtToken(jwt);

        RealEstateDto realEstate=realEstateService.addToFavorites(id,user);

        return new ResponseEntity<>(realEstate, HttpStatus.OK);
    }



}
