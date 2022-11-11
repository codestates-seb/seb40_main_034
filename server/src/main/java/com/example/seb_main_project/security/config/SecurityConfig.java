package com.example.seb_main_project.security.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
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

    /**
     * 사용자 패스워드 생성에 사용되는 passwordEncoder 메서드를 등록하는 Spring Bean <br>
     * default 암호화 알고리즘은 bcrypt
     *
     * @return PasswordEncoder
     * @author dev32user
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }
}
