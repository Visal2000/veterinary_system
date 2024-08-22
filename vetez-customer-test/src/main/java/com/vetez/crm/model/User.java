package com.vetez.crm.model;


import lombok.*;

import java.util.Date;
@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    private String name;
    private String email;
    private String password;
    private String phone;
    private String notice;
    private Date registerDate;

}
