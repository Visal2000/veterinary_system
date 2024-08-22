package com.vetez.crm.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Register {
    @NotEmpty
    private String name;
    @NotEmpty
    @Email
    private String email;
    private String phone;
    @Size(min = 6,message = "Minimum password length is 6 characters")
    private String password;
    private String confirmPassword;
}
