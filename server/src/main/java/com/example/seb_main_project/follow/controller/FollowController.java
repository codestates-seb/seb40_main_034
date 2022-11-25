package com.example.seb_main_project.follow.controller;

import com.example.seb_main_project.follow.entity.Follow;
import com.example.seb_main_project.follow.repository.FollowRepository;
import com.example.seb_main_project.member.entity.Member;
import com.example.seb_main_project.member.repository.MemberRepository;
import com.example.seb_main_project.member.service.CustomUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class FollowController {

    @Autowired
    private FollowRepository followRepository;

    @Autowired
    private MemberRepository memberRepository;

    @PostMapping("/follow/{member-id}/")
    public String follow(@PathVariable Integer id, @AuthenticationPrincipal CustomUserDetails userDetail) {

        Optional<Member> optionalToMember = memberRepository.findById(id);
        Member follower = userDetail.getMember();
        Member following = optionalToMember.get();

        Follow follow = new Follow();
        follow.setFollowing(following);
        follow.setFollower(follower);

        followRepository.save(follow);
        //세션에서 현재 유저정보 가져오기
        System.out.println("팔로우 완료");
        return "ok";
    }

    @PostMapping("/unFollow/{member-id}")
    public String unFollow(@PathVariable Integer id, @AuthenticationPrincipal CustomUserDetails userDetail) {
        Optional<Member> optionalToMember = memberRepository.findById(id);
        Member follower = userDetail.getMember();
        Member following = optionalToMember.get();

        followRepository.deleteByFollowerIdAndFollowingId(follower.getId(), following.getId());
        //세션에서 현재 유저정보 가져오기
        return "ok";
    }
}
