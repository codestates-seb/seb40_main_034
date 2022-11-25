package com.example.seb_main_project.security.controller;

import com.example.seb_main_project.member.mapper.MemberMapper;
import com.example.seb_main_project.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
public class SecurityController {
    private final MemberService memberService;
    // private final MemberMapper mapper;

    /**
     * 스프링 시큐리티 구현 도중에 사용할 컨트롤러
     *
     * @author dev32user
     */
    @GetMapping("/")
    public String index() {
        return "home";
    }
}
