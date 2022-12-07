package com.example.seb_main_project.member.service;

import com.example.seb_main_project.member.dto.AuthDto;
import com.example.seb_main_project.member.entity.Member;

public interface MemberService {
    Member createMember(Member member);

    Boolean checkNickname(String nickname);

    Member updateMember(AuthDto.Update updateDto, Integer memberId);

    Member getMember(Integer memberId);

    void deleteMember(Integer memberId);

    void logout(Integer memberId);
}
