package com.example.seb_main_project.comment.controller;


import com.example.seb_main_project.comment.dto.CommentDto;
import com.example.seb_main_project.comment.entity.Comment;
import com.example.seb_main_project.comment.mapper.CommentMapper;
import com.example.seb_main_project.comment.repository.CommentRepository;
import com.example.seb_main_project.comment.service.CommentService;
import com.example.seb_main_project.member.service.MemberService;
import com.example.seb_main_project.post.service.PostService;
import com.example.seb_main_project.response.MultiResponseDto;
import com.example.seb_main_project.response.SingleResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/")
@Slf4j
public class CommentController {

    private final CommentService commentService;
    private final PostService postService;
    private final CommentMapper commentMapper;
    private final MemberService memberService;
    private final CommentRepository commentRepository;


    @GetMapping("/post/{post-id}/comment")
    public ResponseEntity getComments(
            @RequestParam int page,
            @RequestParam int size,
            @PathVariable("post-id") Integer postId) {

        Page<Comment> pageComments = commentService.findPageComments(postId, page - 1, size);
        List<Comment> findComments = pageComments.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(
                        commentMapper.commentToCommentResponseDto(findComments), pageComments), HttpStatus.OK);

    }


    @GetMapping("/{comment-id}")
    public ResponseEntity getComment(@PathVariable("comment-id") Integer commentId) {

        Comment findComment = commentService.getComment(commentId);
        CommentDto.CommentResponseDto commentResponseDto = commentMapper.commentToCommentResponseDto(findComment);

        return new ResponseEntity<>(new SingleResponseDto<>(commentResponseDto), HttpStatus.OK);
    }

    @PostMapping("/main/{post-id}/comment")
    public ResponseEntity postComment(
            @PathVariable("post-id") Integer postId,
            @RequestBody CommentDto.CommentPostDto commentPostDto,
            @RequestHeader("Authorization") String authorization) {
        Integer memberId = memberService.getTokenMember(authorization);
        Comment comment = commentService.createComment(commentPostDto, postId, memberId);

        return new ResponseEntity<>(commentMapper.commentToCommentResponseDto(comment), HttpStatus.CREATED);
    }

    @PutMapping("/main/{post-id}/{comment-id}/edit")
    public ResponseEntity updateComment(
            @RequestHeader("Authorization") String authorization,
            @PathVariable("comment-id") Integer commentId,
            @RequestBody CommentDto.CommentPatchDto commentPatchDto,
            @PathVariable("post-id") String parameter) {

        Integer memberId = memberService.getTokenMember(authorization);
        Comment updatedComment = commentService.updateComment(memberId, commentId, commentPatchDto);

        return new ResponseEntity<>(commentMapper.commentToCommentResponseDto(updatedComment), HttpStatus.OK);
    }

    @DeleteMapping("/main/{post-id}/{comment-id}/delete")
    public ResponseEntity deleteComment(
            @RequestHeader("Authorization") String authorization,
            @PathVariable("comment-id") Integer commentId,
            @PathVariable("post-id") String parameter) {

        Integer memberId = memberService.getTokenMember(authorization);
        commentService.deleteComment(memberId, commentId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
