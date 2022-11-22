package com.example.seb_main_project.post.dto;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
@ToString
public class PostPatchDto {

    private long postId;
    private String title;
    private String body;
    private String tags;

    public void setPostId(long postId){

        this.postId = postId;
    }










}
