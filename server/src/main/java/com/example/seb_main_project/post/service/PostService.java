package com.example.seb_main_project.post.service;


import com.example.seb_main_project.exception.BusinessLogicException;
import com.example.seb_main_project.exception.ExceptionCode;
import com.example.seb_main_project.post.entity.Post;
import com.example.seb_main_project.post.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

//=============================================================================================================

    //[ GET ]: '모든 게시글 조회'를 요청. '모든 게시글들'을 조회
    public Page<Post> showPosts(int page, int size){

        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("id").descending());

        return postRepository.findAll(pageRequest);

    }

//=============================================================================================================

    //[ GET ]: '특정 하나의 게시글 조회'를 요청. '특정 하나의 게시글'을 조회
    public Post showPost(Long postId){

        return showVerifiedPost(postId);
    }

    private Post showVerifiedPost(Long postId){
        Optional<Post> optionalPost = postRepository.findById(postId);
        Post showPost = optionalPost.orElseThrow(()->
                            new BusinessLogicException(ExceptionCode.POST_NOT_FOUND));

        return showPost;
    }

//=============================================================================================================

    //[ POST ]: '새로운 게시글을 작성'하는 요청.
    @Transactional
    public Post createPost(Post post, Long memberId, Long tagId){

        Member member = memberRepository.findById(memberId).orElseThrow(()->{
                            return new IllegalArgumentException("글 작성 실패! 없는 사용자입니다.");
        });//https://github.com/codestates-seb/seb39_main_010/blob/main/DeployServer/src/main/java/com/team10/preproject/question/service/QuestionService.java

        Tag tag = tagRepository.findById(tagId).orElseThrow(()->{
                            return new IllegalArgumentException("글 작성 실패! 없는 태그입니다.")
        });

        Post.changeMember(member); //이거 'Post 엔티티'에 넣에 '메소드 changeMember'확인해서 넣어주기
        Post.changeTag(tag);

        return postRepository.save(post);

    }

//=============================================================================================================

    //[ PATCH ] : '새로운 게시글을 수정'하는 요청
    @Transactional
    public Post updatePost(Post post){

        Post showPost = showVerifiedPost(post.getPostId());

        Optional.ofNullable(post.getTitle())
                .ifPresent(title -> showPost.setTitle(title));
        Optional.ofNullable(post.getBody())
                .ifPresent(body -> showPost.setBody(body));
        Optional.ofNullable(post.getTags())
                .ifPresent(tags -> showPost.setTags(tags));

        return postRepository.save(showPost);
    }


//=============================================================================================================

    //[ DELETE ]: 기존의 게시글 삭제하는 요청
    @Transactional
    public void deletePost(Long postId){

    Post post = showVerifiedPost(postId);
    postRepository.delete(post);
    }

//=============================================================================================================

}





















