package com.example.seb_main_project.post.mapper;

import com.example.seb_main_project.post.dto.PostPostDto;
import com.example.seb_main_project.post.dto.PostPatchDto;
import com.example.seb_main_project.post.dto.PostResponseDto;
import com.example.seb_main_project.post.entity.Post;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface PostMapper {

    Post postPostDtoToPost(PostPostDto postPostDto);

    Post postPatchDtoToPost(PostPatchDto postPatchDto);

    PostPostDto toPostResponseDto(Post post);

    List<PostPostDto> toPostResponseDtos(List<Post> posts);

}






