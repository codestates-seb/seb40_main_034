package com.example.seb_main_project.postlike.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class PostLikeResponseDto {

    private long likeCount;
    private Boolean isVoted;

    public PostLikeResponseDto(long likeCount, boolean isVoted) {
        this.likeCount = likeCount;
        this.isVoted = isVoted;
    }

}
