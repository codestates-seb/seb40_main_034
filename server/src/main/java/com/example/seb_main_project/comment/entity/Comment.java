package com.example.seb_main_project.comment.entity;

import com.example.seb_main_project.like.commentlike.entity.CommentLike;
import com.example.seb_main_project.post.entity.Post;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Comment extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    @ManyToOne
    @JoinColumn(name = "POST_ID")
    private Post post;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @OneToMany(mappedBy = "comment", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private List<CommentLike> commentLikes = new ArrayList<>();
    private long likeCount;

    public void setCommentLikes(CommentLike commentLike) {
        this.commentLikes.add(commentLike);
    }

    public void updateContent(String content) {
        this.content = content;
    }

    public void discount(CommentLike commentLike) {
        this.commentLikes.remove(commentLike);
    }

    public void updateLikeCount() {
        this.likeCount = (long) this.commentLikes.size();
    }
}

}
