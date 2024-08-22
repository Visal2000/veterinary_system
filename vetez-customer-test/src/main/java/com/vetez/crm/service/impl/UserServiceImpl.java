package com.vetez.crm.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.vetez.crm.entity.UserEntity;
import com.vetez.crm.model.User;
import com.vetez.crm.repository.UserRepository;
import com.vetez.crm.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository repository;

    @Autowired
    ObjectMapper mapper;
    @Override
    public User getUserByEmail(String email) {
        //User userM = mapper.convertValue(repository.findByEmail(email), User.class);

        //System.out.println(userM);
        UserEntity user = repository.findByEmail(email);

        if (user != null) {
           var springUser = org.springframework.security.core.userdetails.User.withUsername(user.getEmail())
                    .password(user.getPassword())
                    .build();
            return mapper.convertValue(springUser, User.class);
        }

        return null;
    }
}
