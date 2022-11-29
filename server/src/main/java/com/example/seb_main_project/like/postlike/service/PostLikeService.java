package com.example.seb_main_project.like.postlike.service;

import com.example.seb_main_project.like.postlike.entity.PostLike;
import com.example.seb_main_project.like.postlike.repository.PostLikeRepository;
import com.example.seb_main_project.post.entity.Post;
import com.example.seb_main_project.post.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;


@Transactional
@RequiredArgsConstructor
@Service
public class PostLikeService {

    @Autowired
    private final PostLikeRepository postLikeRepository;
    @Autowired
    private final PostService postService;

    public boolean postLike(Long postId) {

        Post showPost = postService.showPost(postId);
        Optional<PostLike> optionalPostLike = postLikeRepository.findByPost(showPost);

        optionalPostLike.ifPresentOrElse(
                postLike -> {   //만약, 기존에 이미 좋아요를 눌렀던 상태라면
                    postLikeRepository.delete(postLike);
                    showPost.discountLike(postLike);
                    showPost.updateLikeCount();
                },
                () -> { //여기서 좋아요를 다시 누르면 그건 '좋아요 취소'가 되는 것이라는 말
                    PostLike postLike = PostLike.builder().build();

                    postLike.setPost(showPost);
                    showPost.updateLikeCount();

                    postLikeRepository.save(postLike);
                }
        );

        if (optionalPostLike.isPresent())
            return false;
        else
            return true;
    }

}
























