package com.example.seb_main_project.follow.service;

import com.example.seb_main_project.follow.entity.Follow;
import com.example.seb_main_project.follow.repository.FollowRepository;
import com.example.seb_main_project.member.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FollowService {
    @Autowired
    FollowRepository followRepository;
    @Autowired
    MemberService memberService;

    public void save(int login_id, int page_id) { // 팔로우
        Follow f = new Follow();

        f.setFollowing(memberService.findById(login_id));
        f.setFollower(memberService.findById(page_id));

        followRepository.save(f);
    }

    public void deleteByFollowingIdAndFollowerId(long id1, long id2) { // 언팔로우
        followRepository.deleteByFollowingIdAndFollowerId(id2, id1);
    }

    public boolean find(int id, String userId) { // 팔로우가 되어있는지를 확인하기위해
        if (followRepository.countByFollowerIdAndFollowingUserId(id, userId) == 0)
            return false; // 팔로우 안되어있음
        return true; // 되어있음
    }
}