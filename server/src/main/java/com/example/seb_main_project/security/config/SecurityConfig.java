package com.example.seb_main_project.security.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

import java.util.Optional;

import static org.springframework.security.authorization.AuthorityAuthorizationManager.hasRole;

@Configuration
@EnableWebSecurity  // 스프링 시큐리티 필터가 필터 체인에 등록된다. 스프링 시큐리티 필터 : 하단의 클래스
@RequiredArgsConstructor
public class SecurityConfig {


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .formLogin()
                .and()
                .authorizeHttpRequests(authorize -> authorize
                        .mvcMatchers("/admin").hasRole("ADMIN")
                        .mvcMatchers("/h2/**").access((authentication, request) ->
                                Optional.of(hasRole("ADMIN").check(authentication, request))
                                        .filter(decision -> !decision.isGranted())
                                        .orElseGet(() -> hasRole("DBA")
                                                .check(authentication, request)))
                        .anyRequest().authenticated()
                );

        return http.build();

    }

}
