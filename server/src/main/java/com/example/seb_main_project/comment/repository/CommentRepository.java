package com.example.seb_main_project.comment.repository;


import com.example.seb_main_project.comment.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Integer> {

}
