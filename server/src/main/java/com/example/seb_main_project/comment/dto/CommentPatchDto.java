package com.example.seb_main_project.comment.dto;


import lombok.*;

@AllArgsConstructor
@Builder
@Getter
@Setter
@NoArgsConstructor
public class CommentPatchDto {
    private Integer commentId;
    private String content;
}
