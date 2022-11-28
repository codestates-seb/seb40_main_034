package com.example.seb_main_project.comment.mapper;

import com.example.seb_main_project.comment.dto.CommentPatchDto;
import com.example.seb_main_project.comment.dto.CommentPostDto;
import com.example.seb_main_project.comment.dto.CommentResponseDto;
import com.example.seb_main_project.comment.entity.Comment;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CommentMapper {

    Comment commentPostDtoToComment(CommentPostDto commentPostDto);

    Comment commentPatchDtoToComment(CommentPatchDto commentPatchDto);

    CommentResponseDto toCommentResponseDto(Comment comment);

    List<CommentResponseDto> toCommentResponseDtos(List<Comment> comments);
}
