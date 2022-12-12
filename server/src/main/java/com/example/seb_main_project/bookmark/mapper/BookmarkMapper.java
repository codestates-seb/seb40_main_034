package com.example.seb_main_project.bookmark.mapper;

import com.example.seb_main_project.bookmark.dto.BookmarkDto;
import com.example.seb_main_project.bookmark.entity.Bookmark;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.ERROR)
public interface BookmarkMapper {

    @Mapping(source = "bookmarked", target = "bookmarked")
    BookmarkDto.ExistBookmarkResponseDto booleanToBookmarkResponseDto(Boolean bookmarked);

    @Mapping(source = "bookmark.id", target = "bookmarkId")
    @Mapping(source = "bookmark.post.postId", target = "postId")
    @Mapping(source = "bookmark.post.contents", target = "contents")
    @Mapping(source = "bookmark.post.gpsX", target = "gpsX")
    @Mapping(source = "bookmark.post.gpsY", target = "gpsY")
    @Mapping(source = "bookmark.post.address", target = "address")
    @Mapping(source = "bookmark.post.subAddress", target = "subAddress")
    @Mapping(source = "bookmark.member.id", target = "memberId")
    @Mapping(source = "bookmark.member.nickname", target = "nickname")
    @Mapping(source = "bookmark.member.profileImg", target = "profileImg")
    BookmarkDto.MultiBookmarkResponseDto bookmarkToMultiBookmarkResponseDto(Bookmark bookmark);
    List<BookmarkDto.MultiBookmarkResponseDto> bookmarkToMultiBookmarkResponseDto(List<Bookmark> bookmarks);
}
