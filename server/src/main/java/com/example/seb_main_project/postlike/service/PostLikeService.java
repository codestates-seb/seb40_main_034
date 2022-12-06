package com.example.seb_main_project.postlike.service;


import com.example.seb_main_project.exception.BusinessLogicException;
import com.example.seb_main_project.exception.ExceptionCode;
import com.example.seb_main_project.member.entity.Member;
import com.example.seb_main_project.member.repository.MemberRepository;
import com.example.seb_main_project.post.entity.Post;
import com.example.seb_main_project.post.repository.PostRepository;
import com.example.seb_main_project.postlike.entity.PostLike;
import com.example.seb_main_project.postlike.repository.PostLikeRepository;
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
public class PostLikeService {
    private final MemberRepository memberRepository;
    private final PostRepository postRepository;
    private final PostLikeRepository postLikeRepository;

    public void addPostLike(Integer postId, Integer memberId) {
        Member findMember = findIfExistMember(memberId);
        Post findPost = verifiedExistPost(postId);
        Optional<PostLike> findPostLike = postLikeRepository.findAllByMemberAndPost(findMember, findPost);

        if (findPostLike.isPresent()) {
            postLikeRepository.delete(findPostLike.get());
        }else {
            PostLike postLike = new PostLike();
            postLike.setPost(findPost);
            postLike.setMember(findMember);
            PostLike savedPostLike = postLikeRepository.save(postLike);
            findMember.addPostLike(savedPostLike);
        }
    }


    public Boolean checkPostLike(Integer postId, Integer memberId) {
        Post findPost = verifiedExistPost(postId);
        Member findMember = findIfExistMember(memberId);

        return verifiedExistPostLike(findPost, findMember);

    }


    private Member findIfExistMember(Integer memberId) {
        return memberRepository.findById(memberId).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }


    private Post verifiedExistPost(Integer postId) {
        return postRepository.findById(postId).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.POST_NOT_FOUND));
    }

    private Boolean verifiedExistPostLike(Post post, Member member) {
        return this.postLikeRepository.findAllByMemberAndPost(member, post).isPresent();
    }

    public List<PostLike> findPostLikes(Integer memberId) {
        Member findMember = findIfExistMember(memberId);
        return findMember.getPostLikes();
    }
}
