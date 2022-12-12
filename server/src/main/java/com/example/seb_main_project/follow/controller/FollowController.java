package com.example.seb_main_project.follow.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequestMapping(value = "/follow/")
@RestController
@RequiredArgsConstructor
public class FollowController {
    private final FollowService followService;

    @PostMapping("/{member-id}")
    public void createFollow(@PathVariable("member-id") Integer followingId) {
        Integer followerId = (Integer) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        followService.addFollow(followingId, followerId);
    }
}
