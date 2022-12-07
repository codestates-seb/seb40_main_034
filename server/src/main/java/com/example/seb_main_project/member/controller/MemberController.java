package com.example.seb_main_project.member.controller;

import com.example.seb_main_project.member.dto.AuthDto;
import com.example.seb_main_project.member.dto.ExistNickNameResponseDto;
import com.example.seb_main_project.member.entity.Member;
import com.example.seb_main_project.member.mapper.MemberMapper;
import com.example.seb_main_project.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
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
    public ResponseEntity<AuthDto.MemberResponseDto> joinMember(@RequestBody AuthDto.Join joinDto) {
        return new ResponseEntity<>(memberMapper.memberToMemberResponseDto(
                memberService.createMember(memberMapper.joinToMemberEntity(joinDto))),
                HttpStatus.CREATED);
    }

    @PostMapping("/nickname/check")
    public ResponseEntity<ExistNickNameResponseDto> checkNickname(
            @RequestBody AuthDto.NicknameCheck nicknameCheck) {
        Boolean response = memberService.checkNickname(nicknameCheck.getNickname());
        return new ResponseEntity<>(
                memberMapper.booleanToExistNickNameResponseDto(response), HttpStatus.OK);
    }

    @PutMapping("/member-info/edit")
    public ResponseEntity updateMember(
            @RequestBody AuthDto.Update updateDto) {
        Integer memberId = (Integer) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Member member = memberService.updateMember(updateDto, memberId);
        return new ResponseEntity<>(memberMapper.memberToMemberResponseDto(member), HttpStatus.OK);
    }

    @GetMapping("/{member-id}")
    public ResponseEntity<AuthDto.MemberResponseDto> getMember(
            @PathVariable(name = "member-id") Integer memberId) {
        Member member = memberService.getMember(memberId);

        return new ResponseEntity<>(memberMapper.memberToMemberResponseDto(member), HttpStatus.OK);
    }

    @GetMapping("/member-info")
    public ResponseEntity<AuthDto.MemberResponseDto> getMyInfo() {
        Integer memberId = (Integer) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Member member = memberService.getMember(memberId);

        return new ResponseEntity<>(memberMapper.memberToMemberResponseDto(member), HttpStatus.OK);
    }

    @ResponseStatus(HttpStatus.ACCEPTED)
    @DeleteMapping("/delete")
    public void deleteMember() {
        Integer memberId = (Integer) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        memberService.deleteMember(memberId);
    }

    @ResponseStatus(HttpStatus.ACCEPTED)
    @PostMapping("/logout")
    public void logout(){
        SecurityContextHolder.clearContext();
    }
}
