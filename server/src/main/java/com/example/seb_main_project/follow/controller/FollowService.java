package com.example.seb_main_project.follow.controller;

import com.example.seb_main_project.exception.BusinessLogicException;
import com.example.seb_main_project.exception.ExceptionCode;
import com.example.seb_main_project.follow.entity.Follow;
import com.example.seb_main_project.follow.repository.FollowRepository;
import com.example.seb_main_project.member.entity.Member;
import com.example.seb_main_project.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class FollowService {
    private final MemberRepository memberRepository;
    private final FollowRepository followRepository;
    public void addFollow(Integer followingId, Integer followerId) {
        if(followingId.equals(followerId)) {
            throw new BusinessLogicException(ExceptionCode.CAN_NOT_FOLLOW_MYSELF);
        }

        Member findFollowing = findIfExistMember(followingId);
        Member findFollower = findIfExistMember(followerId);
        Optional<Follow> findFollow = followRepository.findByFollowingAndFollower(findFollowing, findFollower);

        if (findFollow.isPresent()) {
            followRepository.delete(findFollow.get());
        } else {
            Follow follow = new Follow();
            follow.setFollower(findFollower);
            follow.setFollowing(findFollowing);
            Follow savedFollow = followRepository.save(follow);
            findFollowing.addFollower(savedFollow);
            findFollower.addFollowing(savedFollow);
        }

    }

    private Member findIfExistMember(Integer memberId) {
        return memberRepository.findById(memberId).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }

    public List<Member> getFollowings(Integer memberId) {
        List<Member> members = new ArrayList<>();
        for(Follow follow : followRepository.findFollowsByFollower(findIfExistMember(memberId))
                .orElseThrow(()-> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND))) {
            log.error(String.valueOf(follow.getFollowing().getId()));
            members.add(follow.getFollowing());
        }
        return members;
    }
    public List<Member> getFollowers(Integer memberId) {
        List<Member> members = new ArrayList<>();
        for(Follow follow : followRepository.findFollowsByFollowing(findIfExistMember(memberId))
                .orElseThrow(()-> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND))) {
            log.error(String.valueOf(follow.getFollower().getId()));
            members.add(follow.getFollower());
        }
        return members;
    }
}
