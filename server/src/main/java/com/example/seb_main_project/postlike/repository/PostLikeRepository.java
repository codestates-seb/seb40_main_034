package com.example.seb_main_project.postlike.repository;

import com.example.seb_main_project.member.entity.Member;
import com.example.seb_main_project.post.entity.Post;
import com.example.seb_main_project.postlike.entity.PostLike;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PostLikeRepository extends JpaRepository<PostLike, Long> {

    Optional<PostLike> findByPostAndMember(Post post, Member member);
}
