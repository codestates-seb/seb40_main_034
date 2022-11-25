package com.example.seb_main_project.post.controller;


import com.example.seb_main_project.post.dto.PostPatchDto;
import com.example.seb_main_project.post.dto.PostPostDto;
import com.example.seb_main_project.post.entity.Post;
import com.example.seb_main_project.post.mapper.PostMapper;
import com.example.seb_main_project.post.service.PostService;
import com.example.seb_main_project.response.MultiResponseDto;
import com.example.seb_main_project.response.SingleResponseDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;


@Slf4j
@Validated
@RequestMapping("/main")
@RestController
public class PostController {

    @Autowired
    private PostService postService;

    @Autowired
    private PostMapper postMapper;


//============================================================================================================

    //[ GET ]: '모든 게시글 조회'를 요청

    @PreAuthorize("hasAuthority('CERTIFIED')")
    @GetMapping() .
    public ResponseEntity show(@@RequestParam int page,
                               @RequestParam int size){

        Page<Post> pagePosts = postService.showPosts(page - 1, size);
        List<Post> shownPosts = pagePosts.getContent; //'Page 타입의 내장 메소드 getContent'

        return new ResponseEntity<>(
                    new MultiResponseDto<>(postMapper.toPostResponseDtos(shownPosts), pagePosts), HttpStatus.OK);

    }

//============================================================================================================

    //[ GET ]: '특정 하나의 게시글 조회'를 요청
    @PreAuthorize("hasAuthority('CERTIFIED')")
    @GetMapping("/{post-id}")
    public ResponseEntity<> show(@PathVariable Long postId) {

        Post shownPost = postService.showPost(postId);

        return new ResponseEntity<>(
                new SingleResponseDto<>(postMapper.toPostResponseDto(shownPost)), HttpStatus.OK);

    }



//============================================================================================================

    //[ POST ]
    @PreAuthorize("hasAuthority('CERTIFIED')")
    @PostMapping
    public ResponseEntity create (@Valid @RequestBody PostPostDto postPostDto) {

        Post createdPost = postService.createPost(postMapper.postPostDtoToPost(postPostDto));

        return new ResponseEntity<>(
                new SingleResponseDto<>(postMapper.toPostResponseDto(createdPost)), HttpStatus.OK);
    }

//============================================================================================================

    //[ PATCH ] :
    @Transactional
    @PatchMapping("/post/{post-id}")
    public ResponseEntity update(@PathVariable("post-id") Long postId, @Valid @RequestBody PostPatchDto postPatchDto){

        postPatchDto.setPostId(postId);
        Post updatedPost = postService.updatePost(postMapper.postPatchDtoToPost(postPatchDto));

        return new ResponseEntity<>(
                    new SingleResponseDto<>(postMapper.toPostResponseDto(updatedPost)), HttpStatus.OK);

//        return (updatedPost != null) ?
//                ResponseEntity.status(HttpStatus.OK).boy(updatedPost) :
//                ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

//============================================================================================================

    //[ DELETE ]
    @Transactional
    @DeleteMapping("/{post-id}")
    public ResponseEntity delete (@PathVariable Long postId){

        postService.deletePost(postId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);

//        return (deletedPost != null) ?
//                ResponseEntity.status(HttpStatus.NO_CONTENT).build() : //삭제를 성공했다면, good 요청을 보내주고
//                ResponseEntity.status(HttpStatus.BAD_REQUEST).build(); //삭제에 실패했다면, bad 요청을 보내주면 된다
    }

//============================================================================================================

}
