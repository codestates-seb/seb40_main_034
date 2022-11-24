package com.example.seb_main_project.member.repository;

import com.example.seb_main_project.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Integer> {
    public Member findByEmail(String email);
}
