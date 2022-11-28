package com.example.seb_main_project.post.entity;


import com.example.seb_main_project.like.postlike.entity.PostLike;
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

    @Column(nullable= false)
    private String title;

    @Column(nullable = false, length=1000)
    private String body;

    @Column
    private String tags;

    @Column
    private long postLikes;

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
    public void changeTag(Tag tag) {
        this.tag = tag;
    }
}
