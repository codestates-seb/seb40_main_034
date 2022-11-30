package com.example.seb_main_project.comment.entity;

import com.example.seb_main_project.like.commentlike.entity.CommentLike;
import com.example.seb_main_project.member.entity.Member;
import com.example.seb_main_project.audit.Auditable;
import com.example.seb_main_project.member.entity.Member;
import com.example.seb_main_project.post.entity.Post;
import lombok.*;

import javax.persistence.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Comment extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer commentId;

    @Column
    private String nickname;
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

    @Column
    private long likeCount;

    public void addPost(Post post){
        this.post = post;
        if(!this.post.getComments().contains(this)){
            this.post.getComments().add(this);
        }
    }
    public void addMember(Member member) {
        this.member = member;
    }

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

    private Integer likeCount;
}
