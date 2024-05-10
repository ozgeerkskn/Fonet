package com.example.fonet.service;

import com.example.fonet.dto.RealEstateDto;
import com.example.fonet.model.Address;
import com.example.fonet.model.RealEstate;
import com.example.fonet.model.User;
import com.example.fonet.repository.AddressRepository;
import com.example.fonet.repository.RealEstateRepository;
import com.example.fonet.repository.UserRepository;
import com.example.fonet.request.CreateRealEstateRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class RealEstateServiceImp implements RealEstateService {

    @Autowired
    private RealEstateRepository realEstateRepository;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private UserRepository userRepository;



    @Override
    public RealEstate createRealEstate(CreateRealEstateRequest req, User user) {

        Address address=addressRepository.save(req.getAddress());

        RealEstate realEstate=new RealEstate();
        realEstate.setAddress(address);
        realEstate.setContactInformation(req.getContactInformation());
        realEstate.setPropertyType(req.getPropertyType());
        realEstate.setDescription(req.getDescription());
        realEstate.setImages(req.getImages());
        realEstate.setName(req.getName());
        realEstate.setOpeningHours(req.getOpeningHours());
        realEstate.setRegistrationDate(LocalDateTime.now());
        realEstate.setOwner(user);


        return realEstateRepository.save(realEstate);
    }

    @Override
    public RealEstate updateRealEstate(Long realEstateId, CreateRealEstateRequest updateRealEstate) throws Exception {
        RealEstate realEstate=findRealEstateById(realEstateId);

        if(realEstate.getPropertyType()!=null){
            realEstate.setPropertyType(updateRealEstate.getPropertyType());
        }
        if(realEstate.getDescription()!=null){
            realEstate.setDescription(updateRealEstate.getDescription());
        }
        if(realEstate.getName()!=null){
            realEstate.setName(updateRealEstate.getName());

        }
        return realEstateRepository.save(realEstate);
    }

    @Override
    public void deleteRealEstate(Long realEstateId) throws Exception {

        RealEstate realEstate=findRealEstateById(realEstateId);

        realEstateRepository.delete(realEstate);

    }

    @Override
    public List<RealEstate> getAllRealEstate() {
        return realEstateRepository.findAll();
    }

    @Override
    public List<RealEstate> searchRealEstate(String keyword) {
        return realEstateRepository.findBySearchQuery(keyword);
    }

    @Override
    public RealEstate findRealEstateById(Long id) throws Exception {
        Optional<RealEstate> opt=realEstateRepository.findById(id);

        if(opt.isEmpty()){
            throw new Exception("Real Estate not found with id"+id);
        }
        return opt.get();
    }

    @Override
    public RealEstate getRealEstateByUserId(Long userId) throws Exception {
        RealEstate realEstate=realEstateRepository.findByOwnerId(userId);
        if(realEstate==null){
            throw new Exception("Real Estate not found with owner id"+userId);
        }
        return realEstate;
    }

    @Override
    public RealEstateDto addToFavorites(Long realEstateId, User user) throws Exception {

        RealEstate realEstate=findRealEstateById(realEstateId);

        RealEstateDto dto=new RealEstateDto();
        dto.setDescription(realEstate.getDescription());
        dto.setImages(realEstate.getImages());
        dto.setTitle(realEstate.getName());
        dto.setId(realEstateId);

        boolean isFavorited = false;
        List<RealEstateDto> favorites = user.getFavorites();
        for(RealEstateDto favorite:favorites) {
            if(favorite.getId().equals(realEstateId)){
                isFavorited = true;
                break;
            }
        }

        if(isFavorited) {
            favorites.removeIf(favorite-> favorite.getId().equals(realEstateId));
        }
        else{
            favorites.add(dto);
        }

        userRepository.save(user);
        return dto;
    }

    @Override
    public RealEstate updateRealEstateStatus(Long id) throws Exception {
        RealEstate realEstate=findRealEstateById(id);
        realEstate.setOpen(!realEstate.isOpen());
        return realEstateRepository.save(realEstate);
    }
}
