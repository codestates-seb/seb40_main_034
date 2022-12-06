package com.example.seb_main_project.security.filter;

import com.example.seb_main_project.exception.BusinessLogicException;
import com.example.seb_main_project.member.dto.AuthDto;
import com.example.seb_main_project.member.entity.Member;
import com.example.seb_main_project.security.dto.LoginDto;
import com.example.seb_main_project.security.jwt.JwtTokenizer;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static com.example.seb_main_project.security.utils.JwtConstants.MEMBER_ID;
import static com.example.seb_main_project.security.utils.JwtConstants.SET_COOKIE;

/**
 * {@link UsernamePasswordAuthenticationFilter} 디폴트 시큐리티 필터, 기본으로 사용 가능한 폼 로그인 방식에서 사용된다.
 * <p>
 * Username/Password 기반의 인증을 처리하기 위해 메서드를 확장해서 구현한 메서드
 *
 * @author dev32user
 */
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authenticationManager;
    private final JwtTokenizer jwtTokenizer;


    /**
     * 시큐리티 필터가 수신한 로그인 요청 스트림에서 인증 정보를 추출하여 {@link AuthenticationManager}에게 전달하는 메서드
     *
     * @param request  시큐리티 필터가 수신한 로그인 인증 정보
     * @param response 응답
     */
    @SneakyThrows
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) {

        ObjectMapper objectMapper = new ObjectMapper();
        LoginDto loginDto = objectMapper.readValue(request.getInputStream(), LoginDto.class);

        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(
                        loginDto.getEmail(),
                        loginDto.getPassword());

        return authenticationManager.authenticate(authenticationToken);
    }


    @Override
    protected void successfulAuthentication(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain chain,
            Authentication authResult) throws IOException, ServletException, BusinessLogicException {
        Member member = (Member) authResult.getPrincipal();
        String email = member.getEmail();
        Member findMember = jwtTokenizer.findMemberByEmail(email);

        String accessToken = delegateAccessToken(findMember);
        String refreshToken = delegateRefreshToken(findMember);

        jwtTokenizer.saveRefreshToken(refreshToken, email, findMember.getId());

        response.setHeader("Authorization", "Bearer " + accessToken);

        sendResponse(accessToken, refreshToken, email, response);
        this.getSuccessHandler().onAuthenticationSuccess(request, response, authResult);
    }

    /**
     * 로그인 시에 응답
     */
    private void sendResponse(
            String accessToken, String refreshToken, String email,
            HttpServletResponse response) throws IOException {
        Gson gson = new Gson();
        Member findMember = jwtTokenizer.findMemberByEmail(email);

        ResponseCookie cookie = ResponseCookie.from(MEMBER_ID, findMember.getId().toString())
                .maxAge(7 * 24 * 60 * 60)
                .path("/")
                .secure(true)
                .sameSite("None")
                .httpOnly(true)
                .build();
        response.addHeader(SET_COOKIE, cookie.toString());

        AuthDto.Response authResponse = AuthDto.Response.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .nickname(findMember.getNickname())
                .memberId(String.valueOf(findMember.getId()))
                .email(email)
                .build();

        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.getWriter().write(gson.toJson(authResponse, AuthDto.Response.class));
    }

    private String delegateAccessToken(Member member) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("id", member.getId());
        claims.put("email", member.getEmail());
        claims.put("roles", member.getRoles());

        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        return jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);
    }

    private String delegateRefreshToken(Member member) {
        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        return jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);
    }

}
