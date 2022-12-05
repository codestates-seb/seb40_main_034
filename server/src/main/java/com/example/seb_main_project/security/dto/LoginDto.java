package com.example.seb_main_project.security.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import javax.validation.constraints.NotBlank;

/**
 * 로그인에 사용하는 dto 클래스
 */
@Getter
@RequiredArgsConstructor
public class LoginDto {
    @NotBlank
    private String email;
    @NotBlank
    private String password;
}
