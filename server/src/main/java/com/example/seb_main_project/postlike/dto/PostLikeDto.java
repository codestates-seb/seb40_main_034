package com.example.seb_main_project.postlike.dto;


import lombok.*;


public class PostLikeDto {

    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ExistPostLikeResponseDto {
        private Boolean postLiked;
    }

    @Builder
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class MultiPostLikeResponseDto implements Comparable<MultiPostLikeResponseDto> {
        private Integer postLikeId;
        private Integer postId;
        private Integer memberId;
        private String nickname;
        private String contents;


        @Override
        public int compareTo(MultiPostLikeResponseDto o) {
            return o.postLikeId - this.postLikeId;
        }
    }
}
