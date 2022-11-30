package com.example.seb_main_project.post.mapper;

import com.example.seb_main_project.post.dto.PostDto;
import com.example.seb_main_project.post.entity.Post;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.WARN)
public interface PostMapper {

    Post postPostDtoToPost(PostDto.PostCreateDto postPostCreateDto);

    Post postPatchDtoToPost(PostDto.PostPatchDto postPatchDto);

    PostDto.PostCreateDto postToPostResponseDto(Post post);

    List<PostDto.PostCreateDto> postToPostResponseDto(List<Post> posts);

    PostDto.PostResponseDto postToPostDto(Post findPost);
}
