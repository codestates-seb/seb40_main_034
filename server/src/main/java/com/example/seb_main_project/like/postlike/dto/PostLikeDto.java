package com.example.seb_main_project.like.postlike.dto;


import com.example.seb_main_project.post.entity.Post;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class PostLikeDto {

    private long likeCount;
    private Boolean isVoted;

}
