package com.example.seb_main_project.member.memberControlloer;

import com.example.seb_main_project.follow.service.FollowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

public class MemberController {
    @Autowired
    FollowService followService;

    @RequestMapping("/member/{id}")
    public String main_user(@PathVariable("id") int id, Model model) throws Exception {
        String userId = SecurityContextHolder.getContext().getAuthentication().getName();

        model.addAttribute("page_id", id); // PathVariable로 넘어온 id - 이 페이지의 id
        model.addAttribute("follow", followService.find(id, userId)); // false or true

        return 1;
    }
}
