package com.example.seb_main_project.security.config;

import com.example.seb_main_project.security.filter.JwtAuthenticationFilter;
import com.example.seb_main_project.security.filter.JwtVerificationFilter;
import com.example.seb_main_project.security.handler.MemberAccessDeniedHandler;
import com.example.seb_main_project.security.handler.MemberAuthenticationEntryPoint;
import com.example.seb_main_project.security.handler.MemberAuthenticationFailureHandler;
import com.example.seb_main_project.security.handler.MemberAuthenticationSuccessHandler;
import com.example.seb_main_project.security.jwt.JwtTokenizer;
import com.example.seb_main_project.security.utils.CustomAuthorityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.CsrfFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CharacterEncodingFilter;

import java.util.Arrays;

/**
 * 시큐리티 컨피그 클래스입니다. <br>
 * 어노테이션 @Configuration @EnableWebSecurity @RequiredArgsConstructor 을 사용해서 시큐리티 필터를 필터 체인에 등록한다.
 *
 * @author dev32user
 */
@Configuration
@EnableWebSecurity(debug = true)  // 스프링 시큐리티 필터가 필터 체인에 등록된다. 스프링 시큐리티 필터 : 하단의 클래스
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;

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
        CharacterEncodingFilter encodingFilter = new CharacterEncodingFilter();
        encodingFilter.setEncoding("UTF-8");
        encodingFilter.setForceEncoding(true);

        http
                .headers().frameOptions().sameOrigin()
                .and()
                .addFilterBefore(encodingFilter, CsrfFilter.class)
                .csrf().disable()
                .cors().configurationSource(corsConfigurationSource())   // withDefaults() : use corsConfigurationSource Bean
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .exceptionHandling()
                .authenticationEntryPoint(new MemberAuthenticationEntryPoint())
                .accessDeniedHandler(new MemberAccessDeniedHandler())
                .and()
                .apply(new CustomFilterConfigurer())
                .and()
                .authorizeHttpRequests(authorize -> authorize
                                .mvcMatchers("/h2/**").permitAll()
                                .mvcMatchers("/member/signup").permitAll()
                                .mvcMatchers("/member/login").permitAll()
                                .anyRequest().permitAll()
                        // .mvcMatchers("/admin").hasRole("ADMIN")
                        // .access((authentication, request) ->
                        //         Optional.of(hasRole("ADMIN").check(authentication, request))
                        //                 .filter(decision -> !decision.isGranted())
                        //                 .orElseGet(() -> hasRole("DBA")
                        //                         .check(authentication, request)))
                        // .anyRequest().authenticated()
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
        configuration.addAllowedOrigin("http://localhost:8080");
        configuration.addAllowedOrigin("http://localhost:3000");
        configuration.addAllowedOrigin("http://localhost");
        configuration.addAllowedOrigin("http://poston.s3-website.ap-northeast-2.amazonaws.com/");
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
        configuration.addAllowedHeader("*");
        configuration.addAllowedMethod("*");
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }


    /**
     * 구현한 {@link JwtAuthenticationFilter}를 등록하는 역할을 한다.
     */
    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {
        @Override
        public void configure(HttpSecurity builder) throws Exception {
            AuthenticationManager authenticationManager =
                    builder.getSharedObject(AuthenticationManager.class);
            JwtAuthenticationFilter jwtAuthenticationFilter =
                    new JwtAuthenticationFilter(authenticationManager, jwtTokenizer);
            jwtAuthenticationFilter.setFilterProcessesUrl("/member/login");
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new MemberAuthenticationSuccessHandler());
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new MemberAuthenticationFailureHandler());

            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, authorityUtils);

            builder.addFilter(jwtAuthenticationFilter)
                    .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class);
        }
    }
}
