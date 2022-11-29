package com.example.seb_main_project.postlike.entity;

import com.example.seb_main_project.member.entity.Member;
import com.example.seb_main_project.post.entity.Post;

import javax.persistence.*;
import java.util.Optional;

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

    public void setMember(Member member){
        this.member = member;
        member.setPostLikes(this.post.getPostLikes());
    }

    public void setPost(Post post){
        this.post = post;
        post.setPostLikes(this.post.getPostLikes());
    }

    public static boolean isVotedPost(Optional<PostLike> optionalPostLike){

        return optionalPostLike.isPresent();
    }











}
