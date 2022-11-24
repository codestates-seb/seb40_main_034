package com.example.seb_main_project.member.memberControlloer;

import com.example.seb_main_project.follow.entity.Follow;
import com.example.seb_main_project.follow.repository.FollowRepository;
import com.example.seb_main_project.member.entity.Member;
import com.example.seb_main_project.member.repository.MemberRepository;
import com.example.seb_main_project.member.service.CustomUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class MemberController {

    @Autowired
    private FollowRepository followRepository;

    @Autowired
    private MemberRepository memberRepository;

    @GetMapping("/user/{id}")
    public String userDetail(@PathVariable int id, Model model, @AuthenticationPrincipal CustomUserDetails userDetail) {
        Optional<Member> member0 = memberRepository.findById(userDetail.getMember().getId());
        System.out.println("email:" + userDetail.getUsername());
        // 유저정보
        Member member = member0.get();


        // 팔로우정보(User:Follow:User.count())
        List<Follow> followingList = followRepository.findByFollowerId(id);

        int followingCount = followingList.size();

        // 팔로워정보
        List<Follow> followerList = followRepository.findByFollowingId(id);

        List<Integer> followingIdList = new ArrayList<Integer>();
        for (Follow f : followingList) {
            followingIdList.add(f.getFollowing().getId());
        }

        List<Integer> followerIdList = new ArrayList<Integer>();
        for (Follow f : followerList) {
            followerIdList.add(f.getFollower().getId());
        }

        int followerCount = followerList.size();

        // 팔로우 유무 체크
        int followCheck = followRepository.findByFollowerIdAndFollowingId(member.getId(), id);

        model.addAttribute("followCheck", followCheck);
        model.addAttribute("member", member);
        model.addAttribute("followingCount", followingCount);
        model.addAttribute("followerCount", followerCount);
        model.addAttribute("followingList", followingList);
        model.addAttribute("followerList", followerList);
        return "/user/user";
    }
}
