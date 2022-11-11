package com.example.seb_main_project.member.service;

import com.example.seb_main_project.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthRepository extends JpaRepository<Member, Long> {
}
