package com.example.seb_main_project.article.controller;


import com.example.seb_main_project.article.dto.PostDto;
import com.example.seb_main_project.article.entity.Post;
import com.example.seb_main_project.article.service.PostService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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
    private PostService articleService;


//============================================================================================================

    //[ GET. 게시글 리스트 조회 ]
    //https://github.com/codestates-seb/seb39_main_019/blob/main/server/dangProject/src/main/java/com/dangProject/post/controller/PostController.java
    //https://github.com/codestates-seb/seb39_main_059/blob/main/server/catvillage/src/main/java/com/twentyfour_seven/catvillage/board/controller/BoardController.java
    @GetMapping() //이거 요청 URL을 API명세에서 이렇게 수정하기.
    public ResponseEntity<List<PostDto>> showPosts(){

        List<PostDto> postShowDtos = postService.showPosts(postDto);

        return (postShowDtos != null) ?
                ResponseEntity.status(HttpStatus.OK).body(postShowDtos) :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

//============================================================================================================

    //[ GET. 개별 게시글 상세조회 ]
    @PreAuthorize("hasAuthority('CERTIFIED')")
    @GetMapping("/{id}") //- URL 주소 확인
    public ResponseEntity<PostDto> showPost(@PathVariable Long id){

        PostDto postShowDtos = postService.showPost(id);

        return(postShowDtos != null) ?
                ResponseEntity.status(HttpStatus.OK).body(postShowDtos) :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).build();


    }

//============================================================================================================

    //[ POST. 새 게시글 작성 ]
    @PreAuthorize("hasAuthority('CERTIFIED')") //https://github.com/codestates-seb/seb39_main_019/blob/main/server/dangProject/src/main/java/com/dangProject/post/controller/PostController.java
    @PostMapping("/post")
    public ResponseEntity<PostDto> createPost (@RequestBody PostDto postDto){

        PostDto postCreatedDto = postService.create(postDto);

        return (postCreatedDto != null) ?
                ResponseEntity.status(HttpStatus.OK).body(postCreatedDto) :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).build();

    }

//============================================================================================================

    //[ PATCH. 게시글 수정 ] //이미 '게시글 작성 /post'에서 더 URL 들어간 것이니깐
                           //'@PreAuthorize hasAuthority('CERTIFIED')'를 안 써도 없는 것인가?
    @Transactional
    @PatchMapping("/post/{id}")
    public ResponseEntity<PostDto> updatePost (@PathVariable Long id, @RequestBody PostDto postDto){

        PostDto postUpdatedDto = postService.update(postDto);


        return(postUpdatedDto) ?
                ResponseEntity.status(HttpStatus.OK).body(postUpdatedDto) :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).build();

    }

//============================================================================================================

    //[ DELETE ]: 기존의 게시글 삭제하는 요청
    @Transactional
    @DeleteMapping("/post/id")
    public ResponseEntity<PostDto> deletePost (@PathVariable Long id){


        PostDto deletedDto = postService.delete(id);

        reuturn ResponseEntity.status(HttpStatus.OK).body(deletedDto);
    }




}
