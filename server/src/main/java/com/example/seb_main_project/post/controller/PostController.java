package com.example.seb_main_project.post.controller;


import com.example.seb_main_project.bookmark.service.BookmarkService;
import com.example.seb_main_project.member.service.MemberService;
import com.example.seb_main_project.post.dto.PostDto;
import com.example.seb_main_project.post.entity.Post;
import com.example.seb_main_project.post.mapper.PostMapper;
import com.example.seb_main_project.post.service.PostService;
import com.example.seb_main_project.response.MultiResponseDto;
import com.example.seb_main_project.security.repository.RefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;


@Slf4j
@RequestMapping(value = "/")
@RestController
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;
    private final BookmarkService bookmarkService;
    private final PostMapper postMapper;
    private final MemberService memberService;
    private final RefreshTokenRepository refreshTokenRepository;

    @GetMapping("/main/list")
    public ResponseEntity getPosts(
            @RequestParam int page,
            @RequestParam int size,
            @RequestHeader(value = "Authorization", required = false) String authorization) {
        Integer memberId;
        Page<Post> pagePosts = postService.findPosts(page - 1, size);
        List<Post> findPosts = pagePosts.getContent();

        try {
            memberId = memberService.getTokenMember(authorization);
        } catch (Exception e) {
            return new ResponseEntity<>(
                    new MultiResponseDto<>(postMapper.postToPostResponseDto(findPosts), pagePosts),
                    HttpStatus.OK);
        }

        HashMap<Post, Boolean> postWithBookmarked = new HashMap<>();
        for (Post findPost : findPosts) {
            postWithBookmarked.put(findPost, bookmarkService.checkBookmark(findPost.getPostId(), memberId));
        }

        List<PostDto.PostListResponseDto> response = postMapper.postToPostListResponseDto(postWithBookmarked);
        Collections.sort(response);

        return new ResponseEntity<>(
                new MultiResponseDto<>(response, pagePosts),
                HttpStatus.OK);
    }


    @GetMapping("/post/{post-id}/detail")
    public ResponseEntity getPost(@PathVariable(name = "post-id") Integer postId) {

        Post findPost = postService.findPost(postId);

        return new ResponseEntity<>(postMapper.postToPostResponseDto(findPost), HttpStatus.OK);
    }


    @PostMapping("/main/submit")
    public ResponseEntity createPost(
            @RequestHeader("Authorization") String authorization,
            @RequestBody PostDto.PostCreateDto postCreateDto) {
        Integer memberId = memberService.getTokenMember(authorization);

        Post createdPost = postService.createPost(postCreateDto, memberId);

        return new ResponseEntity<>(postMapper.postToPostResponseDto(createdPost), HttpStatus.OK);
    }


    @PutMapping("/main/{post-id}/edit")
    public ResponseEntity updatePost(
            @RequestHeader("Authorization") String authorization,
            @PathVariable("post-id") Integer postId,
            @RequestBody PostDto.PostPatchDto postPatchDto) {

        Integer memberId = memberService.getTokenMember(authorization);
        postPatchDto.setPostId(postId);
        Post updatedPost = postService.updatePost(memberId, postMapper.postPatchDtoToPost(postPatchDto));

        return new ResponseEntity<>(postMapper.postToPostResponseDto(updatedPost), HttpStatus.OK);

    }


    @DeleteMapping("/main/{post-id}/delete")
    public void deletePost(
            @PathVariable(name = "post-id") Integer postId,
            @RequestHeader("Authorization") String authorization) {
        Integer memberId = memberService.getTokenMember(authorization);
        postService.deletePost(postId, memberId);
    }
}
