package com.example.fonet.service;

import com.example.fonet.model.Card;
import com.example.fonet.model.CardItem;
import com.example.fonet.request.AddCardItemRequest;

public interface CardService {

    public CardItem addItemToCard(AddCardItemRequest req, String jwt) throws Exception;

    public CardItem updateCardItemQuantity(Long cardItemId, int quantity) throws Exception;

    public Card removeItemFromCard(Long cardItemId, String jwt) throws Exception;

    public Long calculateCardTotals(Card card) throws Exception;

    public Card findCardById(Long id) throws Exception;

    public Card findCardByUserId(Long userId) throws Exception;

    public Card clearCard(Long userId) throws Exception;
}
