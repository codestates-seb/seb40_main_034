package com.example.seb_main_project.like.postlike.entity;

import com.example.seb_main_project.member.entity.Member;
import com.example.seb_main_project.post.entity.Post;
import lombok.*;

import javax.persistence.*;
import java.util.Optional;



@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Entity
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

    public void setMember(Member member){
        this.member = member;
        member.setPostLikes(this);
    }

    public void setPost(Post post){
        this.post = post;
        post.setPostLikes(this);
    }

    public static boolean isVotedPost(Optional<PostLike> optionalPostLike){

        return optionalPostLike.isPresent();
    }











}
