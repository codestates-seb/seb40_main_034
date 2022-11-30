package com.example.seb_main_project.post.dto;

import lombok.*;

import java.time.LocalDateTime;


@NoArgsConstructor
@AllArgsConstructor
@Data
@Getter
@Builder
@ToString
public class PostResponseDto {
    private Integer postId;
    private String content;
    private Integer likeCount;
    private String gpsX;
    private String gpsY;
    private LocalDateTime createdAt;
}
