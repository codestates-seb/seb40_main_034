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
//https://github.com/codestates-seb/seb39_main_051/blob/main/server/main/src/main/java/com/codestates/main/post/entity/Post.java

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

    //< 1:N 관계 >
    //https://www.oppadu.com/%EA%B4%80%EA%B3%84%ED%98%95-%EB%8D%B0%EC%9D%B4%ED%84%B0%EB%B2%A0%EC%9D%B4%EC%8A%A4/
    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    private List<Comment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "post", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
    private List<PostLike> postLikes = new ArrayList<>();
    //https://github.com/codestates-seb/seb39_main_051/blob/main/server/main/src/main/java/com/codestates/main/post/entity/Post.java


    public void changeMember(Member member) {
        this.member = member;
    } //https://github.com/codestates-seb/seb39_main_010/blob/main/DeployServer/src/main/java/com/team10/preproject/question/entity/Question.java

    public void changeTag(Tag tag) {
        this.tag = tag;
    }
}

    //< 위도, 경도 추가하기 >
