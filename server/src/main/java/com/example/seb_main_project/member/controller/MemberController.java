package com.example.seb_main_project.member.controller;

import com.example.seb_main_project.member.dto.MemberDto;
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

    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/signup")
    public void joinMember(@RequestBody MemberDto.Join member) {
        memberService.createMember(memberMapper.joinToMemberEntity(member));
    }
}
