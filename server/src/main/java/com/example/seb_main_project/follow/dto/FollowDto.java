package com.example.seb_main_project.follow.dto;

import com.example.seb_main_project.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import static lombok.AccessLevel.PRIVATE;

@AllArgsConstructor
@Getter
@Setter
public class FollowDto {

    private final Integer id;
    private final MemberDto followingMember;
    private final MemberDto followedMember;

    @AllArgsConstructor
    @Getter
    public static class MemberDto {
        private final Integer id;
        private final String nickname;
        private final String name;
    }

    @Getter
    @AllArgsConstructor(access = PRIVATE)
    public static class ListResponse {
        private Integer id;
        private String nickname;
        //private String profileImage;

        public static ListResponse fromEntity(Member member) {
            return new ListResponse(member.getId(), member.getNickname());
        }
    }


}
