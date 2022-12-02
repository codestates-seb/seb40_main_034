package com.example.seb_main_project.post.dto;


import lombok.*;

import java.time.LocalDateTime;

public class PostDto {
    @AllArgsConstructor
    @Getter
    public static class PostCreateDto {
        private String gpsX;
        private String gpsY;
        private String contents;
    }

    @NoArgsConstructor
    @AllArgsConstructor
    @Setter
    @Getter
    @ToString
    public static class PostPatchDto {
        private String gpsX;
        private String gpsY;
        private String contents;

        private Integer postId;
    }

    @NoArgsConstructor
    @AllArgsConstructor
    @Getter
    @Setter
    @ToString
    public static class PostResponseDto {
        private Integer postId;
        private String nickname;
        private String contents;
        private Integer likeCount;
        private String gpsX;
        private String gpsY;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
    }
}