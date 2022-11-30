package com.example.seb_main_project.member.service;

import com.example.seb_main_project.member.entity.Member;

public interface MemberService {
    Member createMember(Member member);

    Boolean checkNickname(String nickname);
}
