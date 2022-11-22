package com.example.seb_main_project.like.postlike.entity;

import com.example.seb_main_project.post.entity.Post;

import javax.persistence.*;
import java.util.Optional;

public class PostLike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postLikeId;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "POST_ID")
    private Post post;

    public void setMember(Member member){ //'엔티티'에는 'Setter' 안되지 않나..?
        this.member = member;
        member.setPostLikes(this); //이거 정확한 뜻...
    }

    public void setPost(Post post){
        this.post = post;
        post.setPostLikes(this);
    }

    public static boolean isVotedPost(Optional<PostLike> optionalPostLike){

        return optionalPostLike.isPresent();
    }











}
