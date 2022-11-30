package com.example.seb_main_project.post.controller;


import com.example.seb_main_project.post.dto.PostPatchDto;
import com.example.seb_main_project.post.dto.PostPostDto;
import com.example.seb_main_project.post.entity.Post;
import com.example.seb_main_project.post.mapper.PostMapper;
import com.example.seb_main_project.post.service.PostService;
import com.example.seb_main_project.response.MultiResponseDto;
import com.example.seb_main_project.response.SingleResponseDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.util.List;


@Slf4j
@Validated
@RequestMapping("/main")
@Transactional
@RestController
public class PostController {

    private PostService postService;

    private PostMapper postMapper;



    @GetMapping("/list")
    public ResponseEntity getPosts(
            @RequestParam int page,
            @RequestParam int size) {

        Page<Post> pagePosts = postService.showPosts(page - 1, size);
        List<Post> shownPosts = pagePosts.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(postMapper.toPostResponseDto(shownPosts), pagePosts), HttpStatus.OK);

    }


    @GetMapping("/{post-id}/detail")
    public ResponseEntity getPost(@PathVariable(name = "post-id") Integer postId) {

        Post findPost = postService.findPost(postId);

        return new ResponseEntity<>(postMapper.postToPostDto(findPost), HttpStatus.OK);

    }


    @PostMapping("/submit")
    public ResponseEntity createPost(
            @CookieValue(name = "memberId") Integer memberId,
            @Valid @RequestBody PostPostDto postPostDto) {

        Post createdPost = postService.createPost(postMapper.postPostDtoToPost(postPostDto), memberId);

        return new ResponseEntity<>(
                new SingleResponseDto<>(postMapper.toPostResponseDto(createdPost)), HttpStatus.OK);
    }


    @PatchMapping("/post/{post-id}")
    public ResponseEntity updatePost(@PathVariable("post-id") Integer postId, @Valid @RequestBody PostPatchDto postPatchDto) {

        postPatchDto.setPostId(postId);
        Post updatedPost = postService.updatePost(postMapper.postPatchDtoToPost(postPatchDto));

        return new ResponseEntity<>(
                new SingleResponseDto<>(postMapper.toPostResponseDto(updatedPost)), HttpStatus.OK);

    }


    @DeleteMapping("/{post-id}")
    public ResponseEntity deletePost(@PathVariable(name = "post-id") Integer postId) {

        postService.deletePost(postId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);

    }
}
