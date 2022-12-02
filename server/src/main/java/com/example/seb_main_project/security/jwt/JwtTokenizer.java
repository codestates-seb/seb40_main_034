package com.example.seb_main_project.security.jwt;

import com.example.seb_main_project.exception.BusinessLogicException;
import com.example.seb_main_project.exception.ExceptionCode;
import com.example.seb_main_project.member.entity.Member;
import com.example.seb_main_project.member.repository.MemberRepository;
import com.example.seb_main_project.security.entity.RefreshToken;
import com.example.seb_main_project.security.repository.RefreshTokenRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.servlet.http.Cookie;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.time.LocalDateTime;
import java.util.Calendar;
import java.util.Date;
import java.util.Map;
import java.util.Optional;

import static com.example.seb_main_project.security.utils.JwtConstants.REFRESH_TOKEN;

/**
 * JWT 생성을 위한 클래스
 *
 * @author dev32user
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class JwtTokenizer {

    @Getter
    @Value("${jwt.secret-key}")
    private String secretKey;

    @Getter
    @Value("${jwt.access-token-expiration-minutes}")
    private int accessTokenExpirationMinutes;

    @Getter
    @Value("${jwt.refresh-token-expiration-minutes}")
    private int refreshTokenExpirationMinutes;

    private final MemberRepository memberRepository;
    private final RefreshTokenRepository refreshTokenRepository;


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
     * @param claims                 인증된 사용자와 관련된 정보(email, 권한)
     * @param expiration             토큰 만료 시간
     * @param subject                사용자 subject(email)
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
     * @param expiration             토큰 만료 시간
     * @param subject                사용자 subject(email)
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


    /**
     * 토큰에 포함되어 있는 Signature 검증으로 JWT 위변조 여부 확인
     * <p>
     * 서명에 사용된 시크릿 키를 설정하고, JWT를 파싱해서 Claims를 얻는다.
     *
     * @param jws                    Signature 포함 JWT
     * @param base64EncodedSecretKey base64 형식으로 인코딩 된 시크릿 키
     */
    public void verifySignature(String jws, String base64EncodedSecretKey) {
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(jws);
    }


    /**
     * JWT 만료 일시 반환 메서드
     *
     * @param expirationMinutes 토큰 만료기간, 단위 : 분
     * @return 토큰 만료 일시
     * @author dev32user
     */
    public Date getTokenExpiration(int expirationMinutes) {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MINUTE, expirationMinutes);

        return calendar.getTime();
    }


    /**
     * 인증 성공 시 사용되는 사용자 엔티티를 반환하는 메서드 <br>
     * 데이터베이스에서 멤버를 찾고 없으면 예외 반환, 있을 경우 최근 로그인 일자 갱신 후 찾은 멤버를 반환한다.
     *
     * @param email 찾을 멤버의 이메일
     * @return 찾은 멤버 객체
     * @author dev32user
     */
    public Member findMemberByEmail(String email) {
        Member findMember = memberRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        findMember.setLatestLogin(LocalDateTime.now());
        memberRepository.save(findMember);
        return findMember;
    }


    /**
     * 전달받은 쿠키 값 중 리프레시 토큰이 있는지 확인하는 메서드
     *
     * @param cookies 전달받은 쿠키 값
     * @return RefreshToken 존재 시 해당 토큰 값 반환
     * @author dev32user
     */
    public String isExistRefresh(Cookie[] cookies) {
        for (Cookie cookie : cookies) {
            if (cookie.getName().equals(REFRESH_TOKEN)) {
                log.info(String.valueOf(cookie));
                return cookie.getValue();};
        }
        throw new BusinessLogicException(ExceptionCode.COOKIE_NOT_FOUND);
    }


    /**
     * 리프레시 토큰이 데이터베이스에 존재하는지 확인하고 그 값이 같은지 비교하는 메서드
     */
    public void verifiedExistRefresh(String refreshToken) {
        RefreshToken findRefreshToken = refreshTokenRepository
                .findRefreshTokenByTokenValue(refreshToken)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.TOKEN_NOT_FOUND));

        if (!refreshToken.equals(findRefreshToken.getTokenValue()))
            throw new BusinessLogicException(ExceptionCode.TOKEN_NOT_FOUND);
    }

    public void saveRefreshToken(String refreshToken, String email, Integer memberId) {
        Optional<RefreshToken> findRefreshToken = refreshTokenRepository.findByMemberId(memberId);
        findRefreshToken.ifPresent(refreshTokenRepository::delete);
        refreshTokenRepository.save(
                RefreshToken.builder()
                        .tokenValue(refreshToken)
                        .tokenEmail(email)
                        .memberId(memberId)
                        .build());
    }
    /**
     * 검증 후 Jws(Claims)를 반환해주는 메서드
     */
    public Jws<Claims> getClaims(String jws, String base64EncodedSecretKey) {
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build().parseClaimsJws(jws);
    }
}
