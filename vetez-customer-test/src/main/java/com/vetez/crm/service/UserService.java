package com.vetez.crm.service;

import com.vetez.crm.model.User;

public interface UserService {
    User getUserByEmail(String email);
}
