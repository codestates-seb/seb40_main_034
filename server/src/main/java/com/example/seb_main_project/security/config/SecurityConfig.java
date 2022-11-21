package com.example.seb_main_project.security.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.springframework.security.authorization.AuthorityAuthorizationManager.hasRole;
import static org.springframework.security.config.Customizer.withDefaults;

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
                .cors(withDefaults())   // TODO : cors setting
                .formLogin().disable()
                .httpBasic().disable()
                .authorizeHttpRequests(authorize -> authorize
                        .anyRequest().permitAll()
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

    /**
     * 구체적인 CORS 정책 설정을 위한 빈
     * <p>
     * 모든 출처에 대해 스크립트 기반의 HTTP 통신 허용 <br>
     * HTTP 메서드에 대한 통신을 허용 <br>
     * 구성한 CORS 정책을 적용 대상 : 모든 URL
     */
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
