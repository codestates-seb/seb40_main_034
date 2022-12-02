package com.example.seb_main_project.tag.repository;

import com.example.seb_main_project.tag.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TagRepository extends JpaRepository<Tag, Integer> {
}
