package com.example.seb_main_project.post.mapper;

import com.example.seb_main_project.post.dto.PostDto;
import com.example.seb_main_project.post.entity.Post;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.WARN)
public interface PostMapper {
    Post postPatchDtoToPost(PostDto.PostPatchDto postPatchDto);

    @Mapping(source = "post.member.nickname", target = "nickname")
    @Mapping(source = "post.member.id", target = "memberId")
    @Mapping(source = "post.tag", target = "tag")
    @Mapping(source = "post.member.profileImg", target = "profileImg")
    PostDto.PostResponseDto postToPostResponseDto(Post post);

    List<PostDto.PostResponseDto> postToPostResponseDto(List<Post> posts);

    @Mapping(source = "key.postId", target = "postId")
    @Mapping(source = "key.member.nickname", target = "nickname")
    @Mapping(source = "key.member.id", target = "memberId")
    @Mapping(source = "key.contents", target = "contents")
    @Mapping(source = "key.gpsX", target = "gpsX")
    @Mapping(source = "key.gpsY", target = "gpsY")
    @Mapping(source = "key.address", target = "address")
    @Mapping(source = "key.subAddress", target = "subAddress")
    @Mapping(source = "key.createdAt", target = "createdAt")
    @Mapping(source = "key.modifiedAt", target = "modifiedAt")
    @Mapping(source = "key.image", target = "image")
    @Mapping(source = "key.tag", target = "tag")
    @Mapping(source = "value", target = "bookmarked")
    PostDto.PostListResponseDto postToPostListResponseDto(Map.Entry<Post, Boolean> postWithBookmarked);

    default List<PostDto.PostListResponseDto> postToPostListResponseDto(Map<Post, Boolean> postWithBookmarked) {
        return postWithBookmarked.entrySet()
                .stream()
                .map(this::postToPostListResponseDto)
                .collect(Collectors.toList());
    }
}
