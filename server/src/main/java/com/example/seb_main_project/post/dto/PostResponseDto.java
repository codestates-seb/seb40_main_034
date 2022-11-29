package com.example.seb_main_project.post.dto;

import com.example.seb_main_project.post.entity.Post;
import lombok.*;

import java.time.LocalDateTime;



@NoArgsConstructor
@AllArgsConstructor
@RequiredArgsConstructor
@Data
@Getter
@Builder
@ToString
public class PostResponseDto {

    private Long postId;
    private String content;
    private Long likeCount;
    private LocalDateTime createdAt;


    public PostResponseDto(Post post) {
        this.postId = post.getPostId();
        this.content = post.getContent();
        this.likeCount = post.getLikeCount();
        this.createdAt = post.getCreatedAt();
    }
}
