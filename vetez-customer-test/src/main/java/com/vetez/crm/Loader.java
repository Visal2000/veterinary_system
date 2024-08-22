package com.vetez.crm;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Loader {
    public static void main(String[] args) {
        SpringApplication.run(Loader.class);
        System.out.println("Loaded");
    }
}
