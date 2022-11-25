package com.example.seb_main_project.post.dto;

import lombok.*;

import java.time.LocalDateTime;



@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
@ToString
public class PostResponseDto {

    private long postId;
    private String title;
    private String body;
    private String tags;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;

    public void setMember(Member member){
        this.postId = member.getPostId();
    }


}
