package com.example.seb_main_project.follow.controller;

import com.example.seb_main_project.follow.dto.FollowDto;
import com.example.seb_main_project.follow.mapper.FollowMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RequestMapping(value = "/follow")
@RestController
@RequiredArgsConstructor
public class FollowController {
    private final FollowService followService;
    private  final FollowMapper followMapper;

    @PostMapping("/{member-id}")
    public void createFollow(@PathVariable("member-id") Integer followingId) {
        Integer followerId = (Integer) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        followService.addFollow(followingId, followerId);
    }

    @GetMapping("/{member-id}/following")
    public ResponseEntity<List<FollowDto.responseMemberDto>> getFollowing(
            @PathVariable("member-id") Integer memberId) {
        return new ResponseEntity<>(
                followMapper.MemberToResponseMemberDto(
                        followService.getFollowings(memberId)), HttpStatus.OK);
    }

    @GetMapping("/{member-id}/follower")
    public ResponseEntity<List<FollowDto.responseMemberDto>> getFollower(
            @PathVariable("member-id") Integer memberId) {
        return new ResponseEntity<>(
                followMapper.MemberToResponseMemberDto(
                        followService.getFollowers(memberId)), HttpStatus.OK);
    }
}
