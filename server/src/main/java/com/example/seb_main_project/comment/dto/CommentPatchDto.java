package com.example.seb_main_project.comment.dto;


import lombok.*;

@Data
@AllArgsConstructor
@Builder
@Getter
@Setter
@NoArgsConstructor
public class CommentPatchDto {

    private Long commentId;
    private String content;
}
