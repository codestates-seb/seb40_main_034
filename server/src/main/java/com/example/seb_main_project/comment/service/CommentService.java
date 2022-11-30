package com.example.seb_main_project.comment.service;


import com.example.seb_main_project.comment.entity.Comment;
import com.example.seb_main_project.comment.repository.CommentRepository;
import com.example.seb_main_project.exception.BusinessLogicException;
import com.example.seb_main_project.exception.ExceptionCode;
import com.example.seb_main_project.member.entity.Member;
import com.example.seb_main_project.member.repository.MemberRepository;
import com.example.seb_main_project.member.service.MemberService;
import com.example.seb_main_project.post.entity.Post;
import com.example.seb_main_project.post.repository.PostRepository;
import com.example.seb_main_project.post.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;


@Transactional
@RequiredArgsConstructor
@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final MemberRepository memberRepository;
    private final PostRepository postRepository;
    private final MemberService memberService;
    private final PostService postService;



    public Comment getComment(Integer commentId){

        return showVerifiedComment(commentId);
    }

    //[ POST ]
    public Comment createComment(Comment comment, Integer postId, Integer memberId){

        Optional<Member> optionalMember = memberRepository.findById(memberId);
        Member shownMember = optionalMember.orElseThrow(()->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));


        Optional<Post> optionalPost = postRepository.findById(postId);
        Post shownPost = optionalPost.orElseThrow(()->
                new BusinessLogicException(ExceptionCode.POST_NOT_FOUND));

        comment.addMember(shownMember);
        comment.addPost(shownPost);

        return commentRepository.save(comment);

    }


    //[ PATCH ]
    public Comment updateComment(Comment comment){

        Comment shownComment = showVerifiedComment(comment.getCommentId());
        Optional.ofNullable(comment.getContent())
                .ifPresent(content -> shownComment.updateContent(content));

        return commentRepository.save(shownComment);
    }


    public Comment showVerifiedComment(Integer commentId){

        Optional<Comment> optionalComment = commentRepository.findById(commentId);
        Comment shownComment = optionalComment.orElseThrow(()->
                new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));

        return shownComment;
    }


    public void deleteComment(Integer commentId){

        Comment shownComment = showVerifiedComment(commentId);
        commentRepository.delete(shownComment);
    }

}
