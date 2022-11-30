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

    @PostMapping("/nickname/check")
    public ResponseEntity<ExistNickNameResponseDto> checkNickname(
            @RequestBody AuthDto.NicknameCheck nicknameCheck) {
        Boolean response = memberService.checkNickname(nicknameCheck.getNickname());
        return new ResponseEntity<>(
                memberMapper.booleanToExistNickNameResponseDto(response), HttpStatus.OK);
    }

    @PutMapping("/member-info/edit")
    public ResponseEntity updateMember(
            @RequestBody AuthDto.Update updateDto,
            @CookieValue(name = "memberId") Integer memberId) {
        Member member = memberService.updateMember(updateDto, memberId);
        return new ResponseEntity<>(memberMapper.memberToMemberResponseDto(member), HttpStatus.OK);
    }
}
