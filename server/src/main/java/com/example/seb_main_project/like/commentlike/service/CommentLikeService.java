package com.example.seb_main_project.like.commentlike.service;


import com.example.seb_main_project.like.commentlike.entity.CommentLike;
import com.example.seb_main_project.like.commentlike.repository.CommentLikeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.transaction.Transactional;
import java.util.Optional;


@RequiredArgsConstructor
@Transactional
@Service
public class CommentLikeService {

    @Autowired
    private final CommentLikeRepository commentLikeRepository;

    @Autowired
    private final CommentService commentService;

    @Autowired
    private final main.java.com.example.seb_main_project.member.service.MemberService memberService;

    public boolean commentLike(Long commentId) {
        Comment showComment = commentService.showComment(commentId);
        Member showMember = SecurityUtils.getCurrentMember(memberService);
        Optional<CommentLike> optionalCommentLike = commentLikeRepository.findByCommentAndMember(showComment, showMember);

        optionalCommentLike.ifPresentOrElse(
                commentLike -> {
                    commentLikeRepository.delete(commentLike);
                    showComment.discount(commentLike);
                    showComment.updateLikeCount();
                },

                () -> {
                    CommentLike commentLike = CommentLike.builder().build();

                    commentLike.setComment(findComment);
                    commentLike.setMember(findMember);
                    findComment.updateLikeCount();

                    commentLikeRepository.save(commentLike);
                }
        );

        if (optionalCommentLike.isPresent())
            return false;
        else
            return true;

    }


}
