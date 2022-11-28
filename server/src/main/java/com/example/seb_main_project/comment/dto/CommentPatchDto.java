package com.example.seb_main_project.comment.dto;


import lombok.*;

@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class CommentPatchDto {

    @Setter
    private Long commentId;
    private String content;
}
