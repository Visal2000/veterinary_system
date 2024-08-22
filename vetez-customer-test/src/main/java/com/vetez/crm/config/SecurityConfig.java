package com.vetez.crm.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.bind.annotation.CrossOrigin;

@Configuration
@EnableWebSecurity
@CrossOrigin
public class SecurityConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http)throws Exception{
        http
//                .authorizeHttpRequests(auth->auth
//                        .requestMatchers("/").permitAll()
//                        .requestMatchers("/contact").permitAll()
//                        .requestMatchers("/store").permitAll()
//                        .requestMatchers("/register").permitAll()
//                        .requestMatchers("/save").permitAll()
//                        .requestMatchers("/noticeL").permitAll()
//                        .requestMatchers("/login").permitAll()
//                        .requestMatchers("/logout").permitAll()
//                        .anyRequest().authenticated()
//                )
//                .formLogin(form -> form
//                        .defaultSuccessUrl("/",true)
//                )
//                .logout(config -> config.logoutSuccessUrl("/"))
//                .build();
                .csrf(csrf ->csrf.disable())
                .authorizeHttpRequests(auth-> auth
                        .requestMatchers("/","/contact","/store","/register","/save","/noticeL","/search-notice","/logout","/api/**").permitAll()
                        .anyRequest().authenticated()
                )
                .formLogin(form-> form
                        .loginPage("/login")
                        .defaultSuccessUrl("/",true)
                )
                .logout(config -> config
                        .logoutUrl("/logout")
                        .logoutSuccessUrl("/")
                );
                return http.build();

    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
}
