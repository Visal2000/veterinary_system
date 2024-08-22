package com.vetez.crm.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.vetez.crm.entity.UserEntity;
import com.vetez.crm.model.Register;
import com.vetez.crm.model.User;
import com.vetez.crm.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

@RestController
public class AccountController {
    @Autowired
    UserRepository repository;

    @Autowired
    ObjectMapper mapper;
    @GetMapping("/register")
    public String register(Model model){
        Register register=new Register();
        model.addAttribute(register);
        model.addAttribute("success",false);
        return "register";
    }

    @PostMapping("/register")
    public String register(Model model, @Valid @ModelAttribute Register register, BindingResult result){
        if(!register.getPassword().equals(register.getConfirmPassword())){
            result.addError(
                    new FieldError("register", "confirmPassword","password and Confirm Password do not match")
            );
        }

        User user=mapper.convertValue(repository.findByEmail(register.getEmail()), User.class);
        if(user!=null){
            result.addError(
                    new FieldError("register","email","Email address is already used ")
            );
        }

        if(result.hasErrors()){
            return "register";
        }

        try{
            var bCryptEncoder=new BCryptPasswordEncoder();

            repository.save(mapper.convertValue(new User(register.getName(),register.getEmail(),register.getPhone(),bCryptEncoder.encode(register.getPassword()),"",new Date()), UserEntity.class));

            model.addAttribute("register",new Register());
            model.addAttribute("success",true);

        }catch(Exception ex){
            result.addError(
                    new FieldError("register","name",ex.getMessage())
            );
        }

        return "register";
    }


}
