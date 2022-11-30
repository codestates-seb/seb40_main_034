package com.example.seb_main_project.post.controller;


import com.example.seb_main_project.post.dto.PostDto;
import com.example.seb_main_project.post.entity.Post;
import com.example.seb_main_project.post.mapper.PostMapper;
import com.example.seb_main_project.post.service.PostService;
import com.example.seb_main_project.response.MultiResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Slf4j
@RequestMapping(value = "/")
@RestController
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;
    private final PostMapper postMapper;


    @GetMapping("/main/list")
    public ResponseEntity getPosts(
            @RequestParam int page,
            @RequestParam int size) {

        Page<Post> pagePosts = postService.showPosts(page - 1, size);
        List<Post> shownPosts = pagePosts.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(postMapper.postToPostResponseDto(shownPosts), pagePosts), HttpStatus.OK);

    }


    @GetMapping("/post/{post-id}/detail")
    public ResponseEntity getPost(@PathVariable(name = "post-id") Integer postId) {

        Post findPost = postService.findPost(postId);

        return new ResponseEntity<>(postMapper.postToPostResponseDto(findPost), HttpStatus.OK);
    }


    @PostMapping("/main/submit")
    public ResponseEntity createPost(
            @RequestBody PostDto.PostCreateDto postCreateDto,
            @CookieValue(name = "memberId") Integer memberId) {
        log.error(postCreateDto.toString());
        log.error(postCreateDto.getContents());
        log.error(memberId.toString());

        Post createdPost = postService.createPost(postCreateDto, memberId);

        return new ResponseEntity<>(postMapper.postToPostResponseDto(createdPost), HttpStatus.OK);
    }


    @PutMapping("/main/{post-id}/edit")
    public ResponseEntity updatePost(
            @CookieValue(name = "memberId") Integer memberId,
            @PathVariable("post-id") Integer postId,
            @RequestBody PostDto.PostPatchDto postPatchDto) {
        postPatchDto.setPostId(postId);
        Post updatedPost = postService.updatePost(memberId, postMapper.postPatchDtoToPost(postPatchDto));

        return new ResponseEntity<>(postMapper.postToPostResponseDto(updatedPost), HttpStatus.OK);

    }


    @DeleteMapping("/main/{post-id}/delete")
    public void deletePost(
            @PathVariable(name = "post-id") Integer postId,
            @CookieValue(name = "memberId") Integer memberId) {
        postService.deletePost(postId, memberId);
    }
}
