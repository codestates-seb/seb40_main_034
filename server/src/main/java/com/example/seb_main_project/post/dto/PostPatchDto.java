package com.example.seb_main_project.post.dto;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Builder
@ToString
public class PostPatchDto {

    private Long postId;
    private String title;
    private String content;

    }










