package com.example.seb_main_project.bookmark.repository;

import com.example.seb_main_project.bookmark.entity.Bookmark;
import com.example.seb_main_project.member.entity.Member;
import com.example.seb_main_project.post.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BookmarkRepository extends JpaRepository<Bookmark, Integer> {
    Optional<Bookmark> findAllByMemberAndPost(Member findMember, Post findPost);
}
