package com.example.seb_main_project.security.service;

import com.example.seb_main_project.exception.BusinessLogicException;
import com.example.seb_main_project.exception.ExceptionCode;
import com.example.seb_main_project.member.entity.Member;
import com.example.seb_main_project.member.service.AuthRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class AuthService {
    private final AuthRepository authRepository;
    private final PasswordEncoder passwordEncoder;

    public void createUser(Member member) {
        verifyExistEmail(member.getEmail());
        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);

        // TODO: member.setRole(createRole);

        authRepository.save(member);
    }

    /**
     * 이메일 정보를 인수로 받아서 리포지토리에 존재하는지 확인하는 메서드
     *
     * @param email String 타입, 이메일 정보
     * @author dev32user
     */
    private void verifyExistEmail(String email) {
        this.authRepository.findByEmail(email)
                .ifPresent(m -> {
                    throw new BusinessLogicException(ExceptionCode.USER_EXISTS);
                });
    }

}
