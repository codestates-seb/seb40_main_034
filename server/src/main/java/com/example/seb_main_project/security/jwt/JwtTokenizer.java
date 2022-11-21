package com.example.seb_main_project.security.jwt;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Calendar;
import java.util.Date;
import java.util.Map;

/**
 * JWT 생성을 위한 클래스
 *
 * @author dev32user
 */
public class JwtTokenizer {
    /**
     * 평문 형태의 시크릿 키를 Base64 형식의 문자열로 인코딩하는 메서드
     *
     * @param secretKey 평문 형태의 시크릿키
     * @return Base64 형식으로 인코딩 된 문자열
     */
    public String encodeBase64SecretKey(String secretKey) {
        return Encoders.BASE64.encode(secretKey.getBytes(StandardCharsets.UTF_8));
    }

    /**
     * 인증된 사용자에게 JWT 최초 발급을 위한 JWT 생성 메서드
     *
     * @param claims 인증된 사용자와 관련된 정보(email, 권한)
     * @param expiration 토큰 만료 시간
     * @param subject 사용자 subject(email)
     * @param base64EncodedSecretKey base64 인코딩 키
     */
    public String generateAccessToken(
            Map<String, Object> claims,
            String subject,
            Date expiration,
            String base64EncodedSecretKey) {
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(Calendar.getInstance().getTime())
                .setExpiration(expiration)
                .signWith(key)
                .compact();
    }

    /**
     * Access Token 만료 시 새로 토큰을 생성하는 메서드
     * 별도의 Claims 없음
     *
     * @param expiration 토큰 만료 시간
     * @param subject 사용자 subject(email)
     * @param base64EncodedSecretKey base64 인코딩 키
     */
    public String generateRefreshToken(String subject, Date expiration, String base64EncodedSecretKey) {
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        return Jwts.builder()
                .setSubject(subject)
                .setIssuedAt(Calendar.getInstance().getTime())
                .setExpiration(expiration)
                .signWith(key)
                .compact();
    }

    /**
     * JWT 서명에 사용할 시크릿 키를 생성하는 메서드
     *
     * @param base64EncodedSecretKey base64 형식으로 인코딩 된 시크릿 키
     */
    private Key getKeyFromBase64EncodedKey(String base64EncodedSecretKey) {
        byte[] keyBytes = Decoders.BASE64.decode(base64EncodedSecretKey);

        // jjwt 0.9.x 버전에서는 서명 과정에서 HMAC 알고리즘을 직접 지정해야 했으나,
        // 최신 버전에서는 내부적으로 적절한 HMAC 알고리즘을 지정해준다.
        @SuppressWarnings("UnnecessaryLocalVariable")
        Key key = Keys.hmacShaKeyFor(keyBytes);

        return key;
    }


}
