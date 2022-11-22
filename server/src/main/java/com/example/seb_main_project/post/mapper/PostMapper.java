package com.example.seb_main_project.post.mapper;

import com.example.seb_main_project.post.dto.PostPostDto;
import com.example.seb_main_project.post.entity.Post;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface PostMapper {

    Post postPostDtoToPost(postPostDto postPostDto); //'클라이언트'로부터 '컨트롤러의 @PostMapping'으로 들어옴

    Post postPatchDtoToPost(postPatchDto postPatchDto); //'클라이언트'로부터 '컨트롤러의 @PatchMapping'으로 들어옴

    PostPostDto toPostResponseDto(Post post);

    List<PostPostDto> toPostResponseDtos(List<Post> posts);













}






