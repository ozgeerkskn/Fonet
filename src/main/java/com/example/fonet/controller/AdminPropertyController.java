package com.example.fonet.controller;


import com.example.fonet.model.Property;
import com.example.fonet.model.RealEstate;
import com.example.fonet.model.User;
import com.example.fonet.request.CreatePropertyRequest;
import com.example.fonet.response.MessageResponse;
import com.example.fonet.service.PropertyService;
import com.example.fonet.service.RealEstateService;
import com.example.fonet.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/property")
public class AdminPropertyController {

    @Autowired
    private PropertyService propertyService;

    @Autowired
    private UserService userService;

    @Autowired
    private RealEstateService realEstateService;


    @PostMapping
    public ResponseEntity<Property> createProperty(@RequestBody CreatePropertyRequest req,
                                                   @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        RealEstate realEstate=realEstateService.getRealEstateByUserId(user.getId());
        Property property = propertyService.createProperty(req,req.getCategory(),realEstate);

        return new ResponseEntity<>(property, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<MessageResponse> deleteProperty(@PathVariable Long id,
                                                          @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);

        propertyService.deleteProperty(id);

        MessageResponse res= new MessageResponse();
        res.setMessage("Property deleted successfully");

        return new ResponseEntity<>(res, HttpStatus.CREATED);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Property> updatePropertyAvailabilityStatus(@PathVariable Long id,
                                                          @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);

        Property property = propertyService.updateAvailabilityStatus(id);

        return new ResponseEntity<>(property, HttpStatus.CREATED);
    }


}
