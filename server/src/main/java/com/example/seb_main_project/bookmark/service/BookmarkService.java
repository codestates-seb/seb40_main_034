package com.example.seb_main_project.bookmark.service;


import com.example.seb_main_project.bookmark.entity.Bookmark;
import com.example.seb_main_project.bookmark.repository.BookmarkRepository;
import com.example.seb_main_project.exception.BusinessLogicException;
import com.example.seb_main_project.exception.ExceptionCode;
import com.example.seb_main_project.member.entity.Member;
import com.example.seb_main_project.member.repository.MemberRepository;
import com.example.seb_main_project.post.entity.Post;
import com.example.seb_main_project.post.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class BookmarkService {
    private final MemberRepository memberRepository;
    private final PostRepository postRepository;
    private final BookmarkRepository bookmarkRepository;

    public void addBookmark(Integer postId, Integer memberId) {
        Member findMember = findIfExistMember(memberId);
        Post findPost = verifiedExistPost(postId);
        Optional<Bookmark> findBookmark = bookmarkRepository.findAllByMemberAndPost(findMember, findPost);

        if (findBookmark.isPresent()) {
            bookmarkRepository.delete(findBookmark.get());
        }else {
            Bookmark bookmark = new Bookmark();
            bookmark.setPost(findPost);
            bookmark.setMember(findMember);
            Bookmark savedBookmark = bookmarkRepository.save(bookmark);
            findMember.addBookmark(savedBookmark);
        }
    }


    public Boolean checkBookmark(Integer postId, Integer memberId) {
        Post findPost = verifiedExistPost(postId);
        Member findMember = findIfExistMember(memberId);

        return verifiedExistBookmark(findPost, findMember);

    }


    private Member findIfExistMember(Integer memberId) {
        return memberRepository.findById(memberId).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }


    private Post verifiedExistPost(Integer postId) {
        return postRepository.findById(postId).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.POST_NOT_FOUND));
    }

    private Boolean verifiedExistBookmark(Post post, Member member) {
        return this.bookmarkRepository.findAllByMemberAndPost(member, post).isPresent();
    }

    public List<Bookmark> findBookmarks(Integer memberId) {
        Member findMember = findIfExistMember(memberId);
        return findMember.getBookmarks();
    }
}
