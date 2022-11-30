package com.example.seb_main_project.comment.controller;


import com.example.seb_main_project.comment.dto.CommentPatchDto;
import com.example.seb_main_project.comment.dto.CommentPostDto;
import com.example.seb_main_project.comment.dto.CommentResponseDto;
import com.example.seb_main_project.comment.entity.Comment;
import com.example.seb_main_project.comment.mapper.CommentMapper;
import com.example.seb_main_project.comment.repository.CommentRepository;
import com.example.seb_main_project.comment.service.CommentService;
import com.example.seb_main_project.member.service.MemberService;
import com.example.seb_main_project.post.service.PostService;
import com.example.seb_main_project.response.SingleResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import javax.validation.Valid;

@Validated
@RequiredArgsConstructor
@RestController
@Transactional
public class CommentController {

    private final CommentService commentService;
    private final PostService postService;
    private final CommentMapper commentMapper;
    private final MemberService memberService;
    private final CommentRepository commentRepository;


//============================================================================================================

    //[ GET ]: '특정 하나의 댓글 조회'를 요청
    @GetMapping("/{comment-id}")
    public ResponseEntity getComment(@PathVariable("comment-id") Integer commentId) {

        Comment findComment = commentService.getComment(commentId);
        CommentResponseDto commentResponseDto = commentMapper.toCommentResponseDto(findComment);

        return new ResponseEntity<>(new SingleResponseDto<>(commentResponseDto), HttpStatus.OK);
    }

//============================================================================================================

    //[ POST ]
    @PostMapping("/posts/{post-id}/comments")
    public ResponseEntity postComment(@PathVariable("post-id") Integer postId,
                                      @Valid @RequestBody CommentPostDto commentPostDto,
                                      @CookieValue(name = "memberId") Integer memberId) {

        Comment comment = commentMapper.commentPostDtoToComment(commentPostDto);
        Comment createdComment = commentService.createComment(comment, postId, memberId);
        CommentResponseDto commentResponseDto = new CommentResponseDto(createdComment);

        return new ResponseEntity<>(commentResponseDto, HttpStatus.CREATED);
    }

//============================================================================================================

    //[ PATCH ]
    @PatchMapping("/posts/{post-id}/comments/{comment-id}")
    public ResponseEntity patchComment(@PathVariable("comment-id") Integer commentId,
                                       @Valid @RequestBody CommentPatchDto commentPatchDto) {

        commentPatchDto.setCommentId(commentId);
        Comment comment = commentMapper.commentPatchDtoToComment(commentPatchDto);
        Comment updatedComment = commentService.updateComment(comment);
        CommentResponseDto commentResponseDto = new CommentResponseDto(updatedComment);

        return new ResponseEntity<>(commentResponseDto, HttpStatus.OK);
    }

//============================================================================================================

    //[ DELETE ]
    @DeleteMapping("/comments/{comment-id}")
    public ResponseEntity delete(@PathVariable("comment-id") Integer commentId) {

        commentService.deleteComment(commentId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
