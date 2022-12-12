package com.example.seb_main_project.follow.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

public class FollowDto {
    @Getter
    @AllArgsConstructor
    public static class responseMemberDto{
        private Integer memberId;
        private String profileImg;
        private String nickname;
    }
}
