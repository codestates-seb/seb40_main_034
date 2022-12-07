package com.example.seb_main_project.security.filter;

import com.example.seb_main_project.security.jwt.JwtTokenizer;
import com.example.seb_main_project.security.utils.CustomAuthorityUtils;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;

import static com.example.seb_main_project.security.utils.JwtConstants.AUTHORIZATION;
import static com.example.seb_main_project.security.utils.JwtConstants.BEARER;

@Slf4j
@RequiredArgsConstructor
public class JwtVerificationFilter extends OncePerRequestFilter {

    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;


    /**
     * 사용자 요청에 대한 권한 인증 메서드 <br>
     * 쿠키에 저장된 리프레시 토큰을 가져와 데이터베이스에서 리프레시 토큰이 존재하는지 확인하고,
     * 액세스 토큰이 유효한지 확인한다.
     *
     * @throws ServletException 요청응답에 대한 예외, 서블렛에서 지원
     * @throws IOException      입력 예외
     * @author dev32user
     */
    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {
        try {
            Map<String, Object> claims = verifyJws(request);
            setAuthenticationToContext(claims);
        } catch (SignatureException se) {
            request.setAttribute("exception", se);
        } catch (ExpiredJwtException ee) {
            request.setAttribute("exception", ee);
        } catch (Exception e) {
            request.setAttribute("exception", e);
        }

        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String authentication = request.getHeader(AUTHORIZATION);
        return authentication == null || !authentication.startsWith(BEARER);
    }

    private void setAuthenticationToContext(Map<String, Object> claims) {
        Integer id = (Integer) claims.get("id");
        List<GrantedAuthority> authorities = authorityUtils.createAuthorities((List<String>) claims.get("roles"));
        Authentication authentication = new UsernamePasswordAuthenticationToken(
                id, null, authorities);
        SecurityContext emptySecurityContext = SecurityContextHolder.createEmptyContext();
        emptySecurityContext.setAuthentication(authentication);
        SecurityContextHolder.setContext(emptySecurityContext);
    }

    private Map<String, Object> verifyJws(HttpServletRequest request) {
        String jws = request.getHeader(AUTHORIZATION).replace(BEARER, "");
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        return jwtTokenizer.getClaims(jws, base64EncodedSecretKey).getBody();
    }
}
