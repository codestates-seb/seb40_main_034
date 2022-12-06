package com.example.seb_main_project.comment.dto;


import lombok.*;

import java.time.LocalDateTime;

public class CommentDto {
    @AllArgsConstructor
    @NoArgsConstructor
    @Setter
    @Getter
    public static class CommentPostDto {
        private String contents;
    }

    @AllArgsConstructor
    @Getter
    @Setter
    @NoArgsConstructor
    public static class CommentPatchDto {
        private String contents;
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Setter
    @Builder
    public static class CommentResponseDto {
        private Integer commentId;
        private Integer memberId;
        private String nickname;
        private String contents;
        private Integer likeCount;
        private LocalDateTime createdAt;

    }
}
