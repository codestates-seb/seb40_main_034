package com.example.seb_main_project.postlike.controller;


import com.example.seb_main_project.member.service.MemberService;
import com.example.seb_main_project.postlike.dto.PostLikeDto;
import com.example.seb_main_project.postlike.entity.PostLike;
import com.example.seb_main_project.postlike.mapper.PostLikeMapper;
import com.example.seb_main_project.postlike.service.PostLikeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/")
@RequiredArgsConstructor
public class PostLikeController {

    private final PostLikeService postLikeService;
    private final MemberService memberService;
    private final PostLikeMapper postLikeMapper;

    @PostMapping("/main/{post-id}/like")
    public ResponseEntity<PostLikeDto.ExistPostLikeResponseDto> createPostLike(
            @PathVariable("post-id") Integer postId,
            @RequestHeader("Authorization") String authorization) {
        Integer memberId = memberService.getTokenMember(authorization);
        postLikeService.addPostLike(postId, memberId);

        return new ResponseEntity<>(
                postLikeMapper.booleanToPostLikeResponseDto(
                        postLikeService.checkPostLike(postId, memberId)), HttpStatus.OK);
    }

    /**
     * 해당 게시글을 좋아요 했는지 확인하는 요청
     */
    @GetMapping("/post/{post-id}/like")
    public ResponseEntity<PostLikeDto.ExistPostLikeResponseDto> checkPostLike(
            @PathVariable("post-id") Integer postId,
            @RequestHeader("Authorization") String authorization) {
        Integer memberId = memberService.getTokenMember(authorization);

        return new ResponseEntity<>(
                postLikeMapper.booleanToPostLikeResponseDto(
                        postLikeService.checkPostLike(postId, memberId)), HttpStatus.OK);
    }

    @GetMapping("/member/{member-id}/like")
    public ResponseEntity<List<PostLikeDto.MultiPostLikeResponseDto>> getPostLikes(
            @PathVariable("member-id") Integer memberId) {
        List<PostLike> postLikes = postLikeService.findPostLikes(memberId);
        List<PostLikeDto.MultiPostLikeResponseDto> response = postLikeMapper
                .postLikeToMultiPostLikeResponseDto(postLikes);
        Collections.sort(response);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}