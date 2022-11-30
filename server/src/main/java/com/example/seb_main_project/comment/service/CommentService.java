package com.example.seb_main_project.comment.service;


import com.example.seb_main_project.comment.dto.CommentDto;
import com.example.seb_main_project.comment.entity.Comment;
import com.example.seb_main_project.comment.mapper.CommentMapper;
import com.example.seb_main_project.comment.repository.CommentRepository;
import com.example.seb_main_project.exception.BusinessLogicException;
import com.example.seb_main_project.exception.ExceptionCode;
import com.example.seb_main_project.member.entity.Member;
import com.example.seb_main_project.member.repository.MemberRepository;
import com.example.seb_main_project.member.service.MemberService;
import com.example.seb_main_project.post.entity.Post;
import com.example.seb_main_project.post.repository.PostRepository;
import com.example.seb_main_project.post.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.Objects;
import java.util.Optional;


@Transactional
@RequiredArgsConstructor
@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final MemberRepository memberRepository;
    private final PostRepository postRepository;
    private final MemberService memberService;
    private final PostService postService;
    private final CommentMapper commentMapper;


    public Comment getComment(Integer commentId) {

        return verifiedExistComment(commentId);
    }

    public Comment createComment(CommentDto.CommentPostDto commentPostDto, Integer postId, Integer memberId) {

        Member findMember = memberRepository.findById(memberId).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        Post findPost = postRepository.findById(postId).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.POST_NOT_FOUND));

        Comment comment = commentMapper.commentPostDtoToComment(commentPostDto);
        comment.setMember(findMember);
        comment.setNickname(findMember.getNickname());
        comment.setPost(findPost);
        comment.setLikeCount(0);

        return commentRepository.save(comment);
    }


    public Comment updateComment(Integer memberId, Integer commentId, CommentDto.CommentPatchDto patch) {
        if (!Objects.equals(memberId, verifiedExistComment(commentId).getMember().getId())) {
            throw new BusinessLogicException(ExceptionCode.UNAUTHORIZED_USER);
        }
        Comment updatedComment = commentRepository.findById(commentId)
                .orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
        updatedComment.setContents(patch.getContents());
        updatedComment.setModifiedAt(LocalDateTime.now());

        return commentRepository.save(updatedComment);
    }


    public Comment verifiedExistComment(Integer commentId) {
        Optional<Comment> optionalComment = commentRepository.findById(commentId);

        return optionalComment.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
    }


    public void deleteComment(Integer memberId, Integer commentId) {
        if (!Objects.equals(memberId, verifiedExistComment(commentId).getMember().getId())) {
            throw new BusinessLogicException(ExceptionCode.UNAUTHORIZED_USER);
        }
        Comment shownComment = verifiedExistComment(commentId);

        commentRepository.delete(shownComment);
    }

    public Page<Comment> findPageComments(Integer postId, int page, int size) {

        return commentRepository.findAllByPostPostId(postId, PageRequest.of(page, size,
                Sort.by("commentId").descending()));
    }
}
