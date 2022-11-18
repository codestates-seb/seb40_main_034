package com.example.seb_main_project.article.repository;


import com.example.seb_main_project.article.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    @Override
    ArrayList<Post> findAll();

    Optional<Post> findById(); //https://github.com/codestates-seb/seb39_main_014/blob/main/server/src/main/java/com/server/soopool/board/repository/BoardRepository.java

    List<Post> findAllByMemberId(Long memberId);
}
