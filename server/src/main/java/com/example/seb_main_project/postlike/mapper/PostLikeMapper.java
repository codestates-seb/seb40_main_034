package com.example.seb_main_project.postlike.mapper;



import com.example.seb_main_project.postlike.dto.PostLikeDto;
import com.example.seb_main_project.postlike.entity.PostLike;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.ERROR)
public interface PostLikeMapper {

    @Mapping(source = "postLiked", target = "postLiked")
    PostLikeDto.ExistPostLikeResponseDto booleanToPostLikeResponseDto(Boolean postLiked);

    @Mapping(source = "postLike.id", target = "postLikeId")
    @Mapping(source = "postLike.post.postId", target = "postId")
    @Mapping(source = "postLike.post.contents", target = "contents")
    @Mapping(source = "postLike.member.id", target = "memberId")
    @Mapping(source = "postLike.member.nickname", target = "nickname")
    PostLikeDto.MultiPostLikeResponseDto postLikeToMultiPostLikeResponseDto(PostLike postLike);
    List<PostLikeDto.MultiPostLikeResponseDto> postLikeToMultiPostLikeResponseDto(List<PostLike> postLikes);
}