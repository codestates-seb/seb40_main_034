package com.example.seb_main_project.post.dto;


import lombok.*;

import java.time.LocalDateTime;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder //이거 사용하는 이유 정확히 확인하기!
@ToString
public class PostPostDto {

    private long postId; //게시글 id
    private String title;
    private String body;
    private String tags;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;


    }


