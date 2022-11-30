package com.example.seb_main_project.postlike.service;

import com.example.seb_main_project.exception.BusinessLogicException;
import com.example.seb_main_project.exception.ExceptionCode;
import com.example.seb_main_project.member.service.MemberService;
import com.example.seb_main_project.post.entity.Post;
import com.example.seb_main_project.post.repository.PostRepository;
import com.example.seb_main_project.post.service.PostService;
import com.example.seb_main_project.postlike.entity.PostLike;
import com.example.seb_main_project.postlike.repository.PostLikeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;


@Transactional
@RequiredArgsConstructor
@Service
public class PostLikeService {

    private final MemberService memberService;
    private final PostLikeRepository postLikeRepository;
    private final PostRepository postRepository;
    private final PostService postService;

    public boolean postLike(Integer postId) {

        Post findPost = postRepository.findById(postId).orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.POST_NOT_FOUND));
        Optional<PostLike> findPostLike = postLikeRepository.findByPost(findPost);


        findPostLike.ifPresentOrElse(
                postLike -> {
                    postLikeRepository.delete(postLike);
                    findPost.discountLike(postLike);
                    findPost.updateLikeCount();
                },
                () -> {
                    PostLike postLike = PostLike.builder().build();

                    postLike.setPost(findPost);
                    findPost.updateLikeCount();

                    postLikeRepository.save(postLike);
                }
        );

        return findPostLike.isEmpty();
    }

}
