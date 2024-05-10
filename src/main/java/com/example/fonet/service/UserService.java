package com.example.fonet.service;

import com.example.fonet.model.User;



public interface UserService {

    public User findUserByJwtToken(String jwt) throws Exception;

    public User findUserByEmail(String email) throws Exception;
}
