package com.example.seb_main_project.bookmark.dto;

import lombok.*;


public class BookmarkDto {

    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ExistBookmarkResponseDto {
        private Boolean bookmarked;
    }

    @Builder
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class MultiBookmarkResponseDto implements Comparable<MultiBookmarkResponseDto> {
        private Integer bookmarkId;
        private Integer postId;
        private Integer memberId;
        private String nickname;
        private String contents;


        @Override
        public int compareTo(MultiBookmarkResponseDto o) {
            return o.bookmarkId - this.bookmarkId;
        }
    }
}
