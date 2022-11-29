package com.example.seb_main_project.post.service;


import com.example.seb_main_project.exception.BusinessLogicException;
import com.example.seb_main_project.exception.ExceptionCode;
import com.example.seb_main_project.member.entity.Member;
import com.example.seb_main_project.member.repository.MemberRepository;
import com.example.seb_main_project.member.service.DBMemberService;
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

    private PostRepository postRepository;
    private MemberRepository memberRepository;

    public PostService(PostRepository postRepository, MemberRepository memberRepository){
        this.postRepository = postRepository;
        this.memberRepository = memberRepository;
    }
//=============================================================================================================

    //[ GET ]: '모든 게시글 조회'를 요청. '모든 게시글들'을 조회
    public Page<Post> showPosts(int page, int size){

        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("postId").descending());

        return postRepository.findAll(pageRequest);

    }

//=============================================================================================================

    //[ GET ]: '특정 하나의 게시글 조회'를 요청. '특정 하나의 게시글'을 조회
    public Post showPost(Long postId){

        return showVerifiedPost(postId);
    }

    public Post showVerifiedPost(Long postId){
        Optional<Post> optionalPost = postRepository.findById(postId);
        Post showPost = optionalPost.orElseThrow(()->
                            new BusinessLogicException(ExceptionCode.POST_NOT_FOUND));

        return showPost;
    }

//=============================================================================================================

    //[ POST ]: '새로운 게시글을 작성'하는 요청.
    @Transactional
    public Post createPost(Post post, Long nickname){

        Member member = memberRepository.findById(nickname).orElseThrow(()->
                new IllegalArgumentException("글 작성 실패! 없는 사용자입니다."));

        post.changeMember(member);

        return postRepository.save(post);

    }

//=============================================================================================================

    //[ PATCH ] : '새로운 게시글을 수정'하는 요청
    @Transactional
    public Post updatePost(Post post){

        Post showPost = showVerifiedPost(post.getPostId());

        Optional.ofNullable(post.getContent())
                .ifPresent(content -> showPost.updateContent(content));


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





















