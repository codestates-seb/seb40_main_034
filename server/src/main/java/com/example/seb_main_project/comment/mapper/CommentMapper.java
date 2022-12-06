package com.example.seb_main_project.comment.mapper;

import com.example.seb_main_project.comment.dto.CommentDto;
import com.example.seb_main_project.comment.entity.Comment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.WARN)
public interface CommentMapper {

    Comment commentPostDtoToComment(CommentDto.CommentPostDto commentPostDto);

    Comment commentPatchDtoToComment(CommentDto.CommentPatchDto commentPatchDto);

    List<CommentDto.CommentResponseDto> commentToCommentResponseDto(List<Comment> comments);

    @Mapping(source = "comment.member.id", target = "memberId")
    CommentDto.CommentResponseDto commentToCommentResponseDto(Comment comment);

}
