package com.example.seb_main_project.auth;

import com.example.seb_main_project.security.jwt.JwtTokenizer;
import io.jsonwebtoken.io.Decoders;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;

import java.util.*;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.notNullValue;

@Slf4j
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class JwtTokenizerTest {
    private static JwtTokenizer jwtTokenizer;
    private String secretKey;
    private String base64EncodedSecretKey;

    /**
     * 테스트에서 사용할 시크릿 키를 Base64 형식으로 인코딩
     */
    @BeforeAll
    public void init() {
        jwtTokenizer = new JwtTokenizer();
        secretKey = "main034Post-on3434main034Post-on3434main034Post-on3434main034Post-on3434";

        base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(secretKey);
    }

    /**
     * 평문인 시크릿 키가 Base64 형식으로 인코딩되는지 확인(Slf4j 사용)
     * <p>
     * 인코딩한 키를 디코딩하여 그 값이 원본 평문과 일치하는지 테스트
     */
    @DisplayName("Secret Key encoding, decoding test")
    @Test
    public void encodeBase64SecretKeyTest() {
        log.info(base64EncodedSecretKey);

        assertThat(
                secretKey,
                is(new String(Decoders.BASE64.decode(base64EncodedSecretKey))));
    }

    @DisplayName("Access Token create test")
    @Test
    public void generateAccessTokenTest() {
        Map<String, Object> claims = new HashMap<>();
        claims.put("memberId", 1);
        claims.put("roles", List.of("USER"));

        String subject = "test access token";
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MINUTE, 10);
        Date expiration = calendar.getTime();

        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);
        log.info(accessToken);
        assertThat(accessToken, notNullValue());
    }

    @DisplayName("Refresh Token create test")
    @Test
    public void generateRefreshTokenTest() {

        String subject = "test refresh token";
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.HOUR, 24);
        Date expiration = calendar.getTime();

        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);
        log.info(refreshToken);
        assertThat(refreshToken, notNullValue());
    }
}
