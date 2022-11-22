package com.example.seb_main_project.tag.repository;

import com.example.seb_main_project.tag.entity.TagEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TagRepository extends JpaRepository<TagEntity,Long> {
    @Query(value="SELECT * FROM tag WHERE article_id=:article_id",nativeQuery = true)
    List<TagEntity> findByArticle_id(@Param("article_id")Long article_id);
}