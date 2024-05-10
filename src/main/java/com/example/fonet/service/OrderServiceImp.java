package com.example.fonet.service;

import com.example.fonet.model.*;
import com.example.fonet.repository.AddressRepository;
import com.example.fonet.repository.OrderItemRepository;
import com.example.fonet.repository.OrderRepository;
import com.example.fonet.repository.UserRepository;
import com.example.fonet.request.OrderRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OrderServiceImp implements OrderService{


    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RealEstateService realEstateService;

    @Autowired
    private CardService cardService;

    @Override
    public Order createOrder(OrderRequest order, User user) throws Exception {

        Address shipAddress=order.getDeliveryAddress();

        Address savedAddress=addressRepository.save(shipAddress);
        if(!user.getAddresses().contains(savedAddress)){
            user.getAddresses().add(savedAddress);
            userRepository.save(user);
        }

        RealEstate realEstate= realEstateService.findRealEstateById(order.getRealEstateId());

        Order createdOrder=new Order();
        createdOrder.setCustomer(user);
        createdOrder.setCreatedAt(new Date());
        createdOrder.setOrderStatus("Pending");
        createdOrder.setDeliveryAddress(savedAddress);
        createdOrder.setRealEstate(realEstate);

        Card card=cardService.findCardByUserId(user.getId());

        List<OrderItem> orderItems=new ArrayList<>();
        for(CardItem cardItem : card.getItem()){

            OrderItem orderItem = new OrderItem();
            orderItem.setProperty(cardItem.getProperty());
            orderItem.setFeatures(cardItem.getFeatures());
            orderItem.setQuantity(cardItem.getQuantity());
            orderItem.setTotalPrice(cardItem.getTotalPrice());

            OrderItem savedOrderItem=orderItemRepository.save(orderItem);
            orderItems.add(savedOrderItem);

        }
        Long totalPrice=cardService.calculateCardTotals(card);

        createdOrder.setItems(orderItems);
        createdOrder.setTotalPrice(totalPrice);

        Order savedOrder=orderRepository.save(createdOrder);
        realEstate.getOrders().add(savedOrder);

        return createdOrder;
    }

    @Override
    public Order updateOrder(Long orderId, String orderStatus) throws Exception {
        Order order=findOrderById(orderId);
        if(orderStatus.equals("ORDER_FOR_DELIVERY")
                || orderStatus.equals("DELIVERED")
                || orderStatus.equals("COMPLETED")
                || orderStatus.equals("PENDING")
        ){
            order.setOrderStatus(orderStatus);
            return orderRepository.save(order);
        }
        throw new Exception("Please select a valid order status");
    }

    @Override
    public void cancelOrder(Long orderId) throws Exception {

        Order order = findOrderById(orderId);
        orderRepository.deleteById(orderId);

    }

    @Override
    public List<Order> getUsersOrder(Long userId) throws Exception {
        return orderRepository.findByCustomerId(userId);
    }

    @Override
    public List<Order> getRealEstatesOrder(Long realEstateId, String orderStatus) throws Exception {
        List<Order> orders = orderRepository.findByRealEstateId(realEstateId);
        if(orderStatus!=null){
            orders = orders.stream().filter(order->
                    order.getOrderStatus().equals(orderStatus)).collect(Collectors.toList());
        }

        return orders;
    }

    @Override
    public Order findOrderById(Long orderId) throws Exception {

        Optional<Order> optionalOrder=orderRepository.findById(orderId);
        if(optionalOrder.isEmpty()){
            throw new Exception("Order not found");
        }
        return optionalOrder.get();
    }
}
