package com.example.seb_main_project.member.dto;

import lombok.*;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

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
        private String memberId;
        private String accessToken;
        private String nickname;
        private String email;
    }

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class NicknameCheck {
        private String nickname;
    }

    @Getter
    @AllArgsConstructor
    public static class Update {
        private String nickname;
        private String profileImg;
    }

    @NoArgsConstructor
    @Setter
    @Getter
    @ToString
    public static class MemberResponseDto {
        private String nickname;
        private Integer memberId;
        private String createdAt;
        private String modifiedAt;
        private LocalDateTime latestLogin;
    }

    @Getter
    @Builder
    @AllArgsConstructor
    public static class Token {
        private String accessToken;
        private String refreshToken;
    }
}
