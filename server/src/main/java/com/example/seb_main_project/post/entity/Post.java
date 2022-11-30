package com.example.seb_main_project.post.entity;


import com.example.seb_main_project.comment.entity.Comment;
import com.example.seb_main_project.like.postlike.entity.PostLike;
import com.example.seb_main_project.member.entity.Member;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Post extends BaseTimeEntity {

    //< 기본 칼럼 설정 >
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postId; //pk

    @Column
    private String nickname;
    @Column(nullable = false, length=1000)
    private String content;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;
    @Column
    private long likeCount;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    private List<Comment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "post", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
    private List<PostLike> postLikes = new ArrayList<>();

    public void changeMember(Member member) {
        this.member = member;
    }

    public void setPostLikes(PostLike postLike) {
        this.postLikes.add(postLike);
    }

    public void updateContent(String content) {
        this.content = content;
    }

    public void updateLikeCount() {
        this.likeCount = postLikes.size();
    }

    public void discountLike(PostLike postLike) {
        this.postLikes.remove(postLike);
    }

}

