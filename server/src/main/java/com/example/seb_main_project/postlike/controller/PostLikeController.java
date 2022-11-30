package com.example.seb_main_project.postlike.controller;


import com.example.seb_main_project.post.service.PostService;
import com.example.seb_main_project.postlike.dto.PostLikeResponseDto;
import com.example.seb_main_project.postlike.service.PostLikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class PostLikeController {

    @Autowired
    private final PostLikeService postLikeService;

    @Autowired
    private final PostService postService;

    @PostMapping("/posts/{post-id}/like")
    public ResponseEntity postLikePost(@PathVariable("post-id") Integer postId){

        boolean isVoted;
        isVoted = postLikeService.postLike(postId);
        long likeCount = postService.findPost(postId).getLikeCount();
        PostLikeResponseDto postLikeResponse = new PostLikeResponseDto(likeCount, isVoted);
        return new ResponseEntity(postLikeResponse, HttpStatus.OK);
    }
}
