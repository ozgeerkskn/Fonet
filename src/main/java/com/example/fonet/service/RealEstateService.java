package com.example.fonet.service;

import com.example.fonet.dto.RealEstateDto;
import com.example.fonet.model.RealEstate;
import com.example.fonet.model.User;
import com.example.fonet.request.CreateRealEstateRequest;


import java.util.List;

public interface RealEstateService {

    public RealEstate createRealEstate(CreateRealEstateRequest req, User user);

    public RealEstate updateRealEstate(Long realEstateId, CreateRealEstateRequest updateRealEstate) throws Exception;

    public void deleteRealEstate(Long realEstateId) throws Exception;

    public List<RealEstate> getAllRealEstate();

    public List<RealEstate>searchRealEstate(String keyword);

    public RealEstate findRealEstateById(Long id) throws Exception;

    public RealEstate getRealEstateByUserId(Long userId) throws Exception;

    public RealEstateDto addToFavorites(Long realEstateId, User user) throws Exception;

    public RealEstate updateRealEstateStatus(Long id) throws Exception;

}