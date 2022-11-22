package com.example.seb_main_project.post.controller;


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
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;

//< 북마크 >
//https://github.com/codestates-seb/seb39_main_004/blob/main/server/src/main/java/run/ward/mmz/domain/post/Bookmark.java

//< 목적마다 Dto? >
//기타북마크바에 해당 내용 보기

//커밋 꼭 하기!
//게시글 CRUD 다 잘 된 39기 19조 링크
//https://github.com/codestates-seb/seb39_main_019/blob/main/server/dangProject/src/main/java/com/dangProject/post/controller/PostController.java

@Slf4j
@RequestMapping("/main")
@RestController
public class PostController {

    @Autowired
    private PostService postService;

    @Autowired
    private PostMapper postMapper;


//============================================================================================================

    //[ GET ]: '모든 게시글 조회'를 요청
    //https://github.com/codestates-seb/seb39_main_019/blob/main/server/dangProject/src/main/java/com/dangProject/post/controller/PostController.java
    //https://github.com/codestates-seb/seb39_main_059/blob/main/server/catvillage/src/main/java/com/twentyfour_seven/catvillage/board/controller/BoardController.java
    @PreAuthorize("hasAuthority('CERTIFIED')")
    @GetMapping() //이거 요청 URL을 API명세에서 이렇게 수정하기.
    public ResponseEntity show(@Positive @RequestParam int page,
                               @Positive @RequestParam int size){

        Page<Post> pagePosts = postService.showPosts(page - 1, size);
        List<Post> shownPosts = pagePosts.getContent; //'Page 타입의 내장 메소드 getContent'

        return new ResponseEntity<>(
                    new MultiResponseDto<>(postMapper.toPostResponseDtos(shownPosts), pagePosts), HttpStatus.OK);

    }

//============================================================================================================

    //[ GET ]: '특정 하나의 게시글 조회'를 요청
    @PreAuthorize("hasAuthority('CERTIFIED')")
    @GetMapping("/{id}") //- URL 주소 확인
    public Post show(@PathVariable Long postId) {

        Post shownPost = postService.showPost(postId);

        return new ResponseEntity<>(
                new SingleResponseDto<>(postMapper.toPostResponseDto(shownPost)), HttpStatus.OK);

    }



//============================================================================================================

    //[ POST ]: '새로운 게시글을 작성'하는 요청.
    @PreAuthorize("hasAuthority('CERTIFIED')") //https://github.com/codestates-seb/seb39_main_019/blob/main/server/dangProject/src/main/java/com/dangProject/post/controller/PostController.java
    @PostMapping("/post")
    public ResponseEntity<Post> create (@Valid @RequestBody PostPostDto postPostDto) {

        Post createdPost = postService.createPost(postMapper.postPostDtoToPost(postPostDto));

        return new ResponseEntity<>(
                new SingleResponseDto<>(postMapper.toPostResponseDto(createdPost)), HttpStatus.OK);
    }


//============================================================================================================

    //[ PATCH ] : '기존의 게시글을 수정'하는 요청 //이미 '게시글 작성 /post'에서 더 URL 들어간 것이니깐
                           //'@PreAuthorize hasAuthority('CERTIFIED')'를 안 써도 없는 것인가?
    @Transactional
    @PatchMapping("/post/{postId}")
    public ResponseEntity<Post> update(@PathVariable Long postId, @Valid @RequestBody PostPostDto postPostDto){

        Post updatedPost = postService.updatePost(postMapper.postPatchDtoToPost(postPostDto));

        return new ResponseEntity<>(
                    new SingleResponseDto<>(postMapper.toPostResponseDto(updatedPost)), HttpStatus.OK);

//        return (updatedPost != null) ?
//                ResponseEntity.status(HttpStatus.OK).boy(updatedPost) :
//                ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

//============================================================================================================

    //[ DELETE ]: 기존의 게시글 삭제하는 요청
    @Transactional
    @DeleteMapping("/post/id")
    public ResponseEntity delete (@PathVariable Long postId){

        Post deletedPost = postService.deletePost(postId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);

//        return (deletedPost != null) ?
//                ResponseEntity.status(HttpStatus.NO_CONTENT).build() : //삭제를 성공했다면, good 요청을 보내주고
//                ResponseEntity.status(HttpStatus.BAD_REQUEST).build(); //삭제에 실패했다면, bad 요청을 보내주면 된다
    }

//============================================================================================================

}
