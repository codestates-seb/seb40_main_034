package com.example.seb_main_project.like.commentlike.entity;


import com.example.seb_main_project.comment.entity.Comment;
import lombok.*;

import javax.persistence.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
public class CommentLike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentLikeId;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @ManyToOne
    @JoinColumn(nmae = "POST_ID")
    private Comment comment;


    public void setMember(Member member){
        this.member = member;
        member.setCommentLikes(this);
    }

    public void setComment(Comment comment){
        this.comment = comment;
        comment.setCommentLikes(this);
    }

    public static boolean isVotedComment(Optional<Comment> optionalCommentLike){

        return optionalCommentLike.isPresent();
    }


}
