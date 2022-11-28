package com.example.seb_main_project.comment.controller;


import com.example.seb_main_project.comment.dto.CommentPatchDto;
import com.example.seb_main_project.comment.dto.CommentPostDto;
import com.example.seb_main_project.comment.dto.CommentResponseDto;
import com.example.seb_main_project.comment.entity.Comment;
import com.example.seb_main_project.comment.mapper.CommentMapper;
import com.example.seb_main_project.comment.repository.CommentRepository;
import com.example.seb_main_project.comment.service.CommentService;
import com.example.seb_main_project.post.service.PostService;
import com.example.seb_main_project.response.SingleResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;

@Validated
@RequiredArgsConstructor
@RestController
public class CommentController {

    private final CommentService commentService;
    private final PostService postService;
    private final CommentMapper commentMapper;
    private final // MemberService memberService; //이거 주석 해제시키기 나중에 MemberService 하고나서
    private final CommentRepository commentRepository;


//============================================================================================================

    //[ GET ]: '특정 하나의 댓글 조회'를 요청
    @GetMapping("/{comment-id}")
    public  ResponseEntity show(@PathVariable("comment-id") Long commentId ){

    Comment shownComment = CommentService.showComment(commentId);
    CommentResponseDto commentResponseDto = commentMapper.toCommentResponseDto(shownComment);

    return new ResponseEntity<>(new SingleResponseDto<>(commentResponseDto), HttpStatus.OK);
    }

//============================================================================================================

    //[ POST ]
    @Transactional
    @PostMapping("/posts/{post-id}/comments")
    public ResponseEntity post(@PathVariable("post-id") Long postId,
                               @Valid @RequestBody CommentPostDto commentPostDto){

    Comment comment = commentMapper.commentPostDtoToComment(commentPostDto);
    Comment createdComment = CommentService.createComment(comment, postId);
    CommentResponseDto commentResponseDto = new CommentResponseDto(createdComment);

    return new ResponseEntity<>(commentResponseDto, HttpStatus.CREATED);
    }

//============================================================================================================

    //[ PATCH ]
    @Transactional
    @PatchMapping("/posts/{post-id}/comments/{comment-id}")
    public ResponseEntity patch(@PathVariable("commment-id") Long commentId,
                                @Valid @RequestBody CommentPatchDto commentPatchDto){

        commentPatchDto.setCommentId(commentId);
        Comment comment = commentMapper.commentPatchDtoToComment(commentPatchDto);
        Comment updatedComment = commentService.updateComment(comment);
        CommentResponseDto commentResponseDto = new CommentResponseDto(updatedComment);

        return new ResponseEntity<>(commentResponseDto, HttpStatus.OK);
    }

//============================================================================================================

    //[ DELETE ]
    @Transactional
    @DeleteMapping("/comments/{comment-id}")
    public ResponseEntity delete(@PathVariable("comment-id") Long commentId){

        commentService.deleteComment(commentId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }


}
