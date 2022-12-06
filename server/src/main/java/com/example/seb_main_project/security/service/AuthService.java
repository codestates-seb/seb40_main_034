package com.example.seb_main_project.security.service;

import com.example.seb_main_project.exception.BusinessLogicException;
import com.example.seb_main_project.exception.ExceptionCode;
import com.example.seb_main_project.member.dto.AuthDto;
import com.example.seb_main_project.member.entity.Member;
import com.example.seb_main_project.member.repository.MemberRepository;
import com.example.seb_main_project.security.entity.RefreshToken;
import com.example.seb_main_project.security.jwt.JwtTokenizer;
import com.example.seb_main_project.security.repository.RefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final MemberRepository memberRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final JwtTokenizer jwtTokenizer;

    public AuthDto.Response reIssueAccessToken(String authorization) {
        RefreshToken findRefreshToken = checkExistToken(authorization);

        Member findMember = memberRepository.findById(findRefreshToken.getMemberId())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        String email = findMember.getEmail();
        List<String> roles = findMember.getRoles();

        AuthDto.Token reIssueToken = createdReIssueToken(email, roles, findRefreshToken.getTokenValue());

        AuthDto.Response response = AuthDto.Response.builder()
                .accessToken(reIssueToken.getAccessToken())
                .nickname(findMember.getNickname())
                .email(findMember.getEmail())
                .build();
        refreshTokenRepository.deleteByMemberId(findMember.getId());
        refreshTokenRepository.save(RefreshToken.builder()
                .tokenValue(reIssueToken.getRefreshToken())
                .tokenEmail(findMember.getEmail())
                .memberId(findMember.getId())
                .build());

        return response;
    }

    private AuthDto.Token createdReIssueToken(String email, List<String> roles, String refreshToken) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", email);
        claims.put("roles", roles);

        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        String accessToken = jwtTokenizer.generateAccessToken(claims, email, expiration, base64EncodedSecretKey);
        return AuthDto.Token.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }

    private RefreshToken checkExistToken(String refreshToken) {
        return refreshTokenRepository
                .findRefreshTokenByTokenValue(refreshToken)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.TOKEN_NOT_FOUND));
    }
}
