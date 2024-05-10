package com.example.fonet.service;


import com.example.fonet.model.Card;
import com.example.fonet.model.CardItem;
import com.example.fonet.model.Property;
import com.example.fonet.model.User;
import com.example.fonet.repository.CardItemRepository;
import com.example.fonet.repository.CardRepository;
import com.example.fonet.repository.PropertyRepository;
import com.example.fonet.request.AddCardItemRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CardServiceImp implements CardService{

    @Autowired
    private CardRepository cardRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private CardItemRepository cardItemRepository;

    @Autowired
    private PropertyService propertyService;

    @Override
    public CardItem addItemToCard(AddCardItemRequest req, String jwt) throws Exception {

        User user=userService.findUserByJwtToken(jwt);

        Property property=propertyService.findPropertyById(req.getPropertyId());

        Card card=cardRepository.findByCustomerId(user.getId());

        for(CardItem cardItem : card.getItem()){
            if(cardItem.getProperty().equals(property)){
                int newQuantity=cardItem.getQuantity()+req.getQuantity();
                return updateCardItemQuantity(cardItem.getId(),newQuantity);
            }
        }

        CardItem newCardItem= new CardItem();
        newCardItem.setProperty(property);
        newCardItem.setCard(card);
        newCardItem.setQuantity(req.getQuantity());
        newCardItem.setFeatures(req.getFeatures());
        newCardItem.setTotalPrice(req.getQuantity()*property.getPrice());

        CardItem savedCardItem=cardItemRepository.save(newCardItem);

        card.getItem().add(savedCardItem);

        return savedCardItem;
    }

    @Override
    public CardItem updateCardItemQuantity(Long cardItemId, int quantity) throws Exception {

        Optional<CardItem> cardItemOptional=cardItemRepository.findById(cardItemId);
        if(cardItemOptional.isEmpty()){
            throw new Exception("Card item not found");
        }
        CardItem item = cardItemOptional.get();
        item.setQuantity(quantity);
        item.setTotalPrice(item.getProperty().getPrice()*quantity);


        return cardItemRepository.save(item);
    }

    @Override
    public Card removeItemFromCard(Long cardItemId, String jwt) throws Exception {


        User user=userService.findUserByJwtToken(jwt);

        Card card=cardRepository.findByCustomerId(user.getId());

        Optional<CardItem> cardItemOptional=cardItemRepository.findById(cardItemId);
        if(cardItemOptional.isEmpty()){
            throw new Exception("Card item not found");
        }

        CardItem item=cardItemOptional.get();
        card.getItem().remove(item);

        return cardRepository.save(card);
    }

    @Override
    public Long calculateCardTotals(Card card) throws Exception {

        Long total=0L;

        for(CardItem cardItem : card.getItem()){
            total+=cardItem.getProperty().getPrice()*cardItem.getQuantity();

        }
        return total;
    }

    @Override
    public Card findCardById(Long id) throws Exception {
        Optional<Card> optionalCard=cardRepository.findById(id);
        if(optionalCard.isEmpty()){
            throw new Exception("Card not found with id "+id);
        }
        return optionalCard.get();
    }

    @Override
    public Card findCardByUserId(Long userId) throws Exception {
      //  User user=userService.findUserByJwtToken(jwt);

        Card card = cardRepository.findByCustomerId(userId);
        card.setTotal(calculateCardTotals(card));

        return card;
    }

    @Override
    public Card clearCard(Long userId) throws Exception {
      //  User user=userService.findUserByJwtToken(userId);

        Card card=findCardByUserId(userId);

        card.getItem().clear();
        return cardRepository.save(card);
    }
}
