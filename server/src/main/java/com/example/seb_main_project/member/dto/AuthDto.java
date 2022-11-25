package com.example.seb_main_project.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;

public class AuthDto {
    @Getter
    @AllArgsConstructor
    public static class Join {
        @NotBlank
        private String email;
        @NotBlank
        private String password;
        @NotBlank
        private String nickname;
    }

    @Getter
    @Builder
    public static class Response {
        private String accessToken;
        private String nickname;
        private String email;
    }
}
