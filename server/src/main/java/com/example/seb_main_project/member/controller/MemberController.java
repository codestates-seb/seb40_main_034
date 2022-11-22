package com.example.seb_main_project.member.controller;

import com.example.seb_main_project.member.dto.AuthDto;
import com.example.seb_main_project.member.mapper.MemberMapper;
import com.example.seb_main_project.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
@Slf4j
public class MemberController {
    private final MemberService memberService;
    private final MemberMapper memberMapper;

    /**
     * 회원가입을 위한 컨트롤러 호출 메서드
     *
     * @param joinDto 회원가입 Dto
     * @author dev32user
     */
    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/signup")
    public void joinMember(@RequestBody AuthDto.Join joinDto) {
        memberService.createMember(memberMapper.joinToMemberEntity(joinDto));
    }
}