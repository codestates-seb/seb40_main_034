package com.example.seb_main_project.post.dto;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder //이거 사용하는 이유 정확히 확인하기!
@ToString
public class PostPatchDto {

    private long postId;
    private String title;
    private String body;
    private String tags;

    public void setId(long postId){
        this.postId = postId;
    }










}
