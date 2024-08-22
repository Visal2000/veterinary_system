package com.vetez.crm.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Setter
@Getter
@Entity
@Table (name = "users")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    @Column(unique = true,nullable = false)
    private String email;
    private String password;
    private String phone;

    private Date registerDate;

}
