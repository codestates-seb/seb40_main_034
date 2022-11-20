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

/**
 * 시큐리티 컨피그 클래스입니다. <br>
 * 어노테이션 @Configuration @EnableWebSecurity @RequiredArgsConstructor 을 사용해서 시큐리티 필터를 필터 체인에 등록한다.
 *
 * @author dev32user
 */
@Configuration
@EnableWebSecurity  // 스프링 시큐리티 필터가 필터 체인에 등록된다. 스프링 시큐리티 필터 : 하단의 클래스
@RequiredArgsConstructor
public class SecurityConfig {

    /**
     * Use authorizeHttpRequests <br>
     * override the default by declare a SecurityFilterChain
     *
     * @param http HttpSecurity 클래스
     * @return SecurityFilterChain
     * @author dev32user
     */
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .headers().frameOptions().sameOrigin()
                .and()
                .csrf().disable()
                .formLogin().disable()
                .authorizeHttpRequests(authorize -> authorize
                        .mvcMatchers("/**").permitAll()
                        .mvcMatchers("/admin").hasRole("ADMIN")
                        .mvcMatchers("/h2/**")
                        .access((authentication, request) ->
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
