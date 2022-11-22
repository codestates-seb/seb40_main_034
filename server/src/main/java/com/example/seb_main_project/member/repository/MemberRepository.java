package com.example.seb_main_project.member.repository;

import com.example.seb_main_project.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Integer> {
    Member findOneByUserId(String userId); //userid로 user를 찾음
    Member findById(int id); //id로 user를 찾음
    Member findByMemberId(String memberId);
}
