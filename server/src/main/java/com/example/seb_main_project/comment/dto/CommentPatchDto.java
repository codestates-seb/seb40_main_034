package com.example.seb_main_project.comment.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@Builder
@NoArgsConstructor
public class CommentPatchDto {

    @Setter
    private Integer commentId;
    private String content;
}
