package com.example.seb_main_project.post.entity;


import com.example.seb_main_project.audit.Auditable;
import com.example.seb_main_project.comment.entity.Comment;
import com.example.seb_main_project.member.entity.Member;
import com.example.seb_main_project.postlike.entity.PostLike;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table
public class Post extends Auditable {
    //< 기본 칼럼 설정 >
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Integer postId; // pk

    @Column(nullable = false, length = 1000)
    private String contents;

    @Column
    private String gpsX;

    @Column
    private String gpsY;

    @Column
    private String tags;

    @Column
    private String nickname;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;
    @Column
    private Integer likeCount;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    private List<Comment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "post", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
    private List<PostLike> postLikes = new ArrayList<>();


    public void setPostLikes(PostLike postLike) {
        this.postLikes.add(postLike);
    }


    public void updateLikeCount() {
        this.likeCount = postLikes.size();
    }

    public void discountLike(PostLike postLike) {
        this.postLikes.remove(postLike);
    }
}
