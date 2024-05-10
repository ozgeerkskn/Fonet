package com.example.fonet.request;

import com.example.fonet.model.Address;
import lombok.Data;

@Data
public class OrderRequest {

    private Long realEstateId;

    private Address deliveryAddress;
}
