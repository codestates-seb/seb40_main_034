package com.example.seb_main_project.comment.service;


import com.example.seb_main_project.comment.entity.Comment;
import com.example.seb_main_project.comment.repository.CommentRepository;
import com.example.seb_main_project.exception.BusinessLogicException;
import com.example.seb_main_project.exception.ExceptionCode;
import com.example.seb_main_project.post.entity.Post;
import com.example.seb_main_project.post.repository.PostRepository;
import com.example.seb_main_project.post.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;


@Transactional
@RequiredArgsConstructor
@Service
public class CommentService {

    @Autowired
    private final CommentRepository commentRepository;
    @Autowired
    private final MemberRepsoitory memberRepository;
    @Autowired
    private final PostRepository postRepository;
    @Autowired
    private final //MemberService memberService;
    @Autowired
    private final PostService postService;


//============================================================================================================

    //[ GET ]: '특정 하나의 댓글 조회'를 요청
    public Comment showComment(Long commentId){

        return showVerifiedComment(commentId);
    }


//============================================================================================================

    //[ POST ]
    public Comment createComment(Comment comment, Long postId){

        Optional<Member> optionalMember = memberRepository.findById(postId);
        Member shownMember = optionalMember.orElseThrow(()->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));


        Optional<Post> optionalPost = postRepository.findById(postId);
        Post shownPost = optionalPost.orElseThrow(()->
                new BusinessLogicException(Exception.POST_NOT_FOUND));

        return commentRepository.save(comment);

    }

//============================================================================================================

    //[ PATCH ]
    public Comment updateComment(Comment comment){

        Comment shownComment = showVerifiedComment(comment.getCommentId());
        Optional.ofNullable(comment.getContent())
                .ifPresent(post -> shownComment.updateContent(content));

        return commentRepository.save(shownComment);
    }


    public Comment showVerifiedComment(Long commentId){

        Optional<Comment> optionalComment = commentRepository.findById(commentId);
        Comment shownComment = optionalComment.orElseThrow(()->
                new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));

        return shownComment;
    }


//============================================================================================================

    //[ DELETE ]
    public void deleteComment(Long commentId){

        Comment shownComment = showVerifiedComment(commentId);
        commentRepository.delete(shownComment);
    }

}
