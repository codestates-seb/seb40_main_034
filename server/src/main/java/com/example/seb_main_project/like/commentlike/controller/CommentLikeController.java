package com.example.seb_main_project.like.commentlike.controller;

import com.example.seb_main_project.like.commentlike.dto.CommentLikeResponseDto;
import com.example.seb_main_project.like.commentlike.service.CommentLikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;


@RequiredArgsConstructor
@RestController
public class CommentLikeController {

    @Autowired
    private final CommentLikeService commentLikeService;

    @Autowired
    private final CommentService commentService;

    @PostMapping("/comments/{comment-id}/like")
    public ResponseEntity commentLikeComment(@PathVariable("comment-id") Long commentId){
        boolean isVoted;
        isVoted = commentLikeService.commentLike(commentId);
        long likeCount = commentService.findComment(commentId).getLikeCount();
        CommentLikeResponseDto commentLikeResponseDto = new CommentLikeResponseDto(likeCount, isVoted);

        return new ResponseEntity(commentLikeResponseDto, HttpStatus.OK);
    }
}
