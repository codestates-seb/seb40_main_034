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


//============================================================================================================

    //[ GET ]: '특정 하나의 댓글 조회'를 요청
    public Comment getComment(Integer commentId){

        return showVerifiedComment(commentId);
    }


//============================================================================================================

    //[ POST ]
    public Comment createComment(Comment comment, Integer postId){

        Optional<Member> optionalMember = memberRepository.findById(postId);
        Member shownMember = optionalMember.orElseThrow(()->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));


        Optional<Post> optionalPost = postRepository.findById(postId);
        Post shownPost = optionalPost.orElseThrow(()->
                new BusinessLogicException(ExceptionCode.POST_NOT_FOUND));

        return commentRepository.save(comment);

    }

//============================================================================================================

    //[ PATCH ]
    public Comment updateComment(Comment comment){

        Comment shownComment = showVerifiedComment(comment.getCommentId());
        Optional.ofNullable(comment.getContent())
                .ifPresent(post -> shownComment.setContent(content));

        return commentRepository.save(shownComment);
    }


    public Comment showVerifiedComment(Integer commentId){

        Optional<Comment> optionalComment = commentRepository.findById(commentId);
        Comment shownComment = optionalComment.orElseThrow(()->
                new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));

        return shownComment;
    }


//============================================================================================================

    //[ DELETE ]
    public void deleteComment(Integer commentId){

        Comment shownComment = showVerifiedComment(commentId);
        commentRepository.delete(shownComment);
    }

}
