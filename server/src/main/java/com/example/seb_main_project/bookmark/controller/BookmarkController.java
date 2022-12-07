package com.example.seb_main_project.bookmark.controller;

import com.example.seb_main_project.bookmark.dto.BookmarkDto;
import com.example.seb_main_project.bookmark.entity.Bookmark;
import com.example.seb_main_project.bookmark.mapper.BookmarkMapper;
import com.example.seb_main_project.bookmark.service.BookmarkService;
import com.example.seb_main_project.member.service.MemberService;
import com.example.seb_main_project.post.mapper.PostMapper;
import com.example.seb_main_project.post.service.PostService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/")
@RequiredArgsConstructor
public class BookmarkController {

    private final BookmarkService bookmarkService;
    private final PostService postService;
    private final MemberService memberService;
    private final BookmarkMapper bookmarkMapper;
    private final PostMapper postMapper;

    @PostMapping("/main/{post-id}/bookmark")
    public ResponseEntity<BookmarkDto.ExistBookmarkResponseDto> createBookmark(
            @PathVariable("post-id") Integer postId) {
        Integer memberId = (Integer) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        bookmarkService.addBookmark(postId, memberId);

        return new ResponseEntity<>(
                bookmarkMapper.booleanToBookmarkResponseDto(
                        bookmarkService.checkBookmark(postId, memberId)), HttpStatus.OK);
    }

    /**
     * 해당 게시글을 북마크 했는지 확인하는 요청
     */
    @GetMapping("/post/{post-id}/bookmark")
    public ResponseEntity<BookmarkDto.ExistBookmarkResponseDto> checkBookmark(
            @PathVariable("post-id") Integer postId) {
        Integer memberId = (Integer) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        return new ResponseEntity<>(
                bookmarkMapper.booleanToBookmarkResponseDto(
                        bookmarkService.checkBookmark(postId, memberId)), HttpStatus.OK);
    }

    @GetMapping("/member/{member-id}/bookmark")
    public ResponseEntity<List<BookmarkDto.MultiBookmarkResponseDto>> getBookmarks(
            @PathVariable("member-id") Integer memberId) {
        List<Bookmark> bookmarks = bookmarkService.findBookmarks(memberId);
        List<BookmarkDto.MultiBookmarkResponseDto> response = bookmarkMapper
                .bookmarkToMultiBookmarkResponseDto(bookmarks);
        Collections.sort(response);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
