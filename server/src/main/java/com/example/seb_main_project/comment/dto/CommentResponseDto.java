package com.example.seb_main_project.comment.dto;


import com.example.seb_main_project.comment.entity.Comment;
import lombok.*;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@RequiredArgsConstructor
@Data
@Getter
@Builder
@ToString
public class CommentResponseDto {

    private Long commentId;
    private String nickname;
    private Long memberId;
    private String content;
    private Long likeCount;
    private LocalDateTime createdAt;

    public CommentResponseDto(Comment comment) {
        this.commentId = comment.getCommentId();
        this.nickname = comment.getMember().getNickname();
        this.memberId = comment.getMember().getMemberId();
        this.content = comment.getContent();
        this.likeCount = comment.getLikeCount();
        this.createdAt = comment.getCreatedAt();
    }
}
