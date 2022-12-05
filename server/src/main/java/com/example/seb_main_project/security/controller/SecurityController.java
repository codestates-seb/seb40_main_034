package com.example.seb_main_project.security.controller;

import com.example.seb_main_project.member.dto.AuthDto;
import com.example.seb_main_project.member.service.MemberService;
import com.example.seb_main_project.security.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
public class SecurityController {
    private final MemberService memberService;
    private final AuthService authService;
    // private final MemberMapper mapper;

    /**
     * 스프링 시큐리티 구현 도중에 사용할 컨트롤러
     *
     * @author dev32user
     */
    @GetMapping("/")
    public String index() {
        return List.of(
                SecurityContextHolder.getContext().getAuthentication().toString(),
                SecurityContextHolder.getContext().getAuthentication().getName(),
                SecurityContextHolder.getContext().getAuthentication().getAuthorities(),
                SecurityContextHolder.getContext().getAuthentication().getDetails(),
                SecurityContextHolder.getContext().getAuthentication().getPrincipal()).toString();
    }

    @GetMapping("")
    public ResponseEntity<AuthDto.Response> reIssueAccessToken(
            @RequestHeader("Autorization") String authorization) {
        AuthDto.Response resultToken = authService.reIssueAccessToken(authorization);
        return ResponseEntity.ok(resultToken);

    }
}
