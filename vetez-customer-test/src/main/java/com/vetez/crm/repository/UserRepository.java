package com.vetez.crm.repository;

import com.vetez.crm.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserEntity,Integer> {
    public UserEntity findByEmail(String email);
}
