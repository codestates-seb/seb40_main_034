package com.example.seb_main_project.post.service;


import com.example.seb_main_project.exception.BusinessLogicException;
import com.example.seb_main_project.exception.ExceptionCode;
import com.example.seb_main_project.member.entity.Member;
import com.example.seb_main_project.member.repository.MemberRepository;
import com.example.seb_main_project.post.dto.PostDto;
import com.example.seb_main_project.post.entity.Post;
import com.example.seb_main_project.post.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Objects;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class PostService {

    private final MemberRepository memberRepository;
    private final PostRepository postRepository;


    public Page<Post> findPosts(int page, int size) {

        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("postId").descending());

        return postRepository.findAll(pageRequest);

    }


    public Post findPost(Integer postId) {

        return findVerifiedPost(postId);
    }

    private Post findVerifiedPost(Integer postId) {
        Optional<Post> optionalPost = postRepository.findById(postId);

        return optionalPost.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.POST_NOT_FOUND));
    }


    public Post createPost(PostDto.PostCreateDto post, Integer memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        Post createdPost = Post.builder()
                .gpsX(post.getGpsX())
                .gpsY(post.getGpsY())
                .contents(post.getContents())
                .member(member)
                .nickname(member.getNickname())
                .image(post.getImage())
                .tag(post.getTag())
                .build();

        return postRepository.save(createdPost);

    }

    public Post updatePost(Integer memberId, Post post) {
        if (!Objects.equals(memberId, findVerifiedPost(post.getPostId()).getMember().getId())) {
            throw new BusinessLogicException(ExceptionCode.UNAUTHORIZED_USER);
        }
        Post showPost = findVerifiedPost(post.getPostId());

        Optional.ofNullable(post.getContents())
                .ifPresent(showPost::setContents);
        Optional.ofNullable(post.getGpsX())
                .ifPresent(showPost::setGpsX);
        Optional.ofNullable(post.getGpsY())
                .ifPresent(showPost::setGpsY);
        Optional.ofNullable(post.getImage())
                .ifPresent(showPost::setImage);
        Optional.ofNullable(post.getTag())
                .ifPresent(showPost::setTag);

        return postRepository.save(showPost);
    }


    public void deletePost(Integer postId, Integer memberId) {
        Post findPost = findVerifiedPost(postId);
        if (!Objects.equals(findPost.getMember().getId(), memberId)) {
            throw new BusinessLogicException(ExceptionCode.UNAUTHORIZED_USER);
        }
        postRepository.delete(findPost);
    }
}
