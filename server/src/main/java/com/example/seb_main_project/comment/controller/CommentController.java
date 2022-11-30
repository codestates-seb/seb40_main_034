package com.example.seb_main_project.comment.controller;


import com.example.seb_main_project.comment.dto.CommentPatchDto;
import com.example.seb_main_project.comment.dto.CommentPostDto;
import com.example.seb_main_project.comment.dto.CommentResponseDto;
import com.example.seb_main_project.comment.entity.Comment;
import com.example.seb_main_project.comment.mapper.CommentMapper;
import com.example.seb_main_project.comment.repository.CommentRepository;
import com.example.seb_main_project.comment.service.CommentService;
import com.example.seb_main_project.post.service.PostService;
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
    private final CommentRepository commentRepository;


//============================================================================================================

    //[ GET ]: '특정 하나의 댓글 조회'를 요청
    @GetMapping("/{comment-id}")
    public ResponseEntity show(@PathVariable("comment-id") Long commentId ){

    Comment shownComment = commentService.showComment(commentId);
    CommentResponseDto commentResponseDto = commentMapper.toCommentResponseDto(shownComment);

    return new ResponseEntity<>(commentResponseDto, HttpStatus.OK);
    }

//============================================================================================================

    //[ POST ]
    @Transactional
    @PostMapping("/posts/{post-id}/comments")
    public ResponseEntity post(@PathVariable("post-id") Long postId, Long memberId, //memberId를 넣어줘야 할까??
                               @Validated @RequestBody CommentPostDto commentPostDto){

    Comment comment = commentMapper.commentPostDtoToComment(commentPostDto);
    Comment createdComment = commentService.createComment(comment, postId, memberId);
    CommentResponseDto commentResponseDto = new CommentResponseDto(createdComment);

    return new ResponseEntity<>(commentResponseDto, HttpStatus.CREATED);
    }

//============================================================================================================

    //[ PATCH ]
    @Transactional
    @PatchMapping("/posts/{post-id}/comments/{comment-id}")
    public ResponseEntity update(@PathVariable("commment-id") Long commentId,
                                @Validated @RequestBody CommentPatchDto commentPatchDto){

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
