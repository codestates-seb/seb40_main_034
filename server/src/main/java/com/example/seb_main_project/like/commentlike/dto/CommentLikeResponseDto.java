package com.example.seb_main_project.like.commentlike.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CommentLikeResponseDto {

    private long likeCount;
    private boolean isVoted;

}
