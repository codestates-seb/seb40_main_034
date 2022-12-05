package com.example.seb_main_project.postlike.entity;

import com.example.seb_main_project.member.entity.Member;
import com.example.seb_main_project.post.entity.Post;
import lombok.*;

import javax.persistence.*;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Entity
public class PostLike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer postLikeId;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "POST_ID")
    private Post post;

    public void setMember(Member member) {
        this.member = member;
        member.setPostLikes((PostLike) this.post.getPostLikes());
    }

    public void setPost(Post post) {
        this.post = post;
        post.setPostLikes((PostLike) this.post.getPostLikes());
    }
}
