package com.example.seb_main_project.member.service;

import com.example.seb_main_project.exception.BusinessLogicException;
import com.example.seb_main_project.exception.ExceptionCode;
import com.example.seb_main_project.member.dto.AuthDto;
import com.example.seb_main_project.member.entity.Member;
import com.example.seb_main_project.member.repository.MemberRepository;
import com.example.seb_main_project.security.utils.CustomAuthorityUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class DBMemberService implements MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils customAuthorityUtils;


    /**
     * Member 회원가입 DB 저장 메서드
     *
     * @param member Member 객체를 받는다.
     * @return 저장한 Member 객체를 반환한다.
     * @author dev32user
     */
    @Override
    public Member createMember(Member member) {
        verifyExistEmail(member.getEmail());
        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);
        member.setRoles(customAuthorityUtils.createAuthorities(member.getEmail()));
        log.info("# Create Member in DB");

        return memberRepository.save(member);
    }

    @Override
    public Boolean checkNickname(String nickname) {
        return verifyExistNickname(nickname);
    }

    @Override
    public Member updateMember(AuthDto.Update updateDto, Integer memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        member.setNickname(updateDto.getNickname());
        member.setModifiedAt(LocalDateTime.now());
        return memberRepository.save(member);
    }

    private Boolean verifyExistNickname(String nickname) {
        return this.memberRepository.findByNickname(nickname).isPresent();
    }

    /**
     * 이메일 정보를 인수로 받아서 리포지토리에 존재하는지 확인하는 메서드
     *
     * @param email String 타입, 이메일 정보
     * @author dev32user
     */
    private void verifyExistEmail(String email) {
        this.memberRepository.findByEmail(email)
                .ifPresent(m -> {
                    throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
                });
    }
}
