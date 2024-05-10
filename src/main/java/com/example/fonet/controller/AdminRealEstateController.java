package com.example.fonet.controller;

import com.example.fonet.model.RealEstate;
import com.example.fonet.model.User;
import com.example.fonet.request.CreateRealEstateRequest;
import com.example.fonet.response.MessageResponse;
import com.example.fonet.service.RealEstateService;
import com.example.fonet.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/realEstates")
public class AdminRealEstateController {

    @Autowired
    private RealEstateService realEstateService;

    @Autowired
    private UserService userService;


    @PostMapping()
    public ResponseEntity<RealEstate> createRealEstate(
            @RequestBody CreateRealEstateRequest req,
            @RequestHeader("Authorization") String jwt
            ) throws Exception {
        User user=userService.findUserByJwtToken(jwt);

        RealEstate realEstate=realEstateService.createRealEstate(req,user);
        return new ResponseEntity<>(realEstate, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RealEstate> updateRealEstate(
            @RequestBody CreateRealEstateRequest req,
            @RequestHeader("Authorization") String jwt,
            @PathVariable Long id
    ) throws Exception {
        User user=userService.findUserByJwtToken(jwt);

        RealEstate realEstate=realEstateService.updateRealEstate(id,req);
        return new ResponseEntity<>(realEstate, HttpStatus.CREATED);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<MessageResponse> deleteRealEstate(
            @RequestHeader("Authorization") String jwt,
            @PathVariable Long id
    ) throws Exception {
        User user=userService.findUserByJwtToken(jwt);

        realEstateService.deleteRealEstate(id);

        MessageResponse res=new MessageResponse();
        res.setMessage("Real estate deleted successfully");
        return new ResponseEntity<>(res, HttpStatus.OK);
    }


    @PutMapping("/{id}/status")
    public ResponseEntity<RealEstate> updateRealEstateStatus(
            @RequestHeader("Authorization") String jwt,
            @PathVariable Long id
    ) throws Exception {
        User user=userService.findUserByJwtToken(jwt);

        RealEstate realEstate=realEstateService.updateRealEstateStatus(id);

        return new ResponseEntity<>(realEstate, HttpStatus.OK);
    }


    @GetMapping("/user")
    public ResponseEntity<RealEstate> findRealEstateByUserId(
            @RequestHeader("Authorization") String jwt
    ) throws Exception {
        User user=userService.findUserByJwtToken(jwt);

        RealEstate realEstate=realEstateService.getRealEstateByUserId(user.getId());

        return new ResponseEntity<>(realEstate, HttpStatus.OK);
    }
}
