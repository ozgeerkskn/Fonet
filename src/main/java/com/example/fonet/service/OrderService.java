package com.example.fonet.service;

import com.example.fonet.model.Order;
import com.example.fonet.model.User;
import com.example.fonet.request.OrderRequest;

import java.util.List;


public interface OrderService  {

    public Order createOrder(OrderRequest order, User user) throws Exception;

    public Order updateOrder(Long orderId, String orderStatus) throws Exception;

    public void cancelOrder(Long orderId) throws Exception;

    public List<Order> getUsersOrder(Long userId) throws Exception;

    public List<Order> getRealEstatesOrder(Long realEstateId, String orderStatus) throws Exception;

    public Order findOrderById(Long orderId) throws Exception;
}
