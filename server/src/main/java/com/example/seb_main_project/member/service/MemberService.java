package com.example.seb_main_project.member.service;

import com.example.seb_main_project.member.entity.Member;
import com.example.seb_main_project.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberService {
    @Autowired
    MemberRepository memberRepository;

    // repository에 있는 findbyuserid를 서비스에서 불러서.. db에 바로 접근 못하게 하려고 service가 있는 거 같아요~^^ 밑에 이런 것들도 마찬가지
    public Member findByMemberId(String memberId) {
        return memberRepository.findByMemberId(memberId);
    }

    public Member findById(int id) {
        return memberRepository.findById(id);
    }
}
