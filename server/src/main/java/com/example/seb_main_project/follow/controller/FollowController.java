package com.example.seb_main_project.follow.controller;

import com.example.seb_main_project.follow.repository.FollowRepository;
import com.example.seb_main_project.follow.service.FollowService;
import com.example.seb_main_project.member.entity.Member;
import com.example.seb_main_project.member.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Controller
public class FollowController {
    @Autowired
    MemberService memberService;
    @Autowired
    FollowService followService;

    @RequestMapping("/follow/view/{member-id}") // pageid
    @ResponseBody
    private Map follow_view(@PathVariable int id, Model model) throws Exception {
        String memberId = SecurityContextHolder.getContext().getAuthentication().getName();
        int follower = followService.countByFollowerId(id);

        Map<String, Object> m = new HashMap<String, Object>();
        m.put("booool", followService.find(id, memberId));
        m.put("follower", follower); // 팔로워도 업뎃되야 되므로

        return m;
    }

    @RequestMapping("/follow/insert/{id}")
    @ResponseBody
    private int follow_insert(@PathVariable int id) throws Exception {
        String memberId = SecurityContextHolder.getContext().getAuthentication().getName();
        Member u = memberService.findByMemberId(memberId);

        followService.save(u.getId(), id);
        return 1;
    }

    @RequestMapping("/follow/delete/{id}")
    @ResponseBody
    private int follow_delete(@PathVariable int id) throws Exception {
        String memberId = SecurityContextHolder.getContext().getAuthentication().getName();
        Member u = memberService.findByMemberId(memberId);

        followService.deleteByFollowingIdAndFollowerId(id, u.getId());
        return 1;
    }
}
