package com.example.seb_main_project.like.postlike.repository;

import com.example.seb_main_project.like.postlike.entity.PostLike;
import com.example.seb_main_project.post.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PostLikeRepository extends JpaRepository<PostLike, Long> {

    Optional<PostLike> findByPost(Post post);
}
