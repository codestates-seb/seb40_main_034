package com.example.seb_main_project.follow.controller;

import com.example.seb_main_project.follow.dto.FollowDto;
import com.example.seb_main_project.follow.service.FollowService;
import com.example.seb_main_project.member.service.MemberService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@RestController
@AllArgsConstructor
public class FollowController {

    private FollowService followService;
    private MemberService memberService;

    @PostMapping("/follow/{member-id}")
    public ResponseEntity<FollowDto> follow(
            @PathVariable("{member-id}") Integer followedMemberId,
            @RequestHeader("Authorization") String authorization) {
        Integer followingMemberId = memberService.getTokenMember(authorization);
        FollowDto followDto = followService.follow(followingMemberId, followedMemberId);
        return new ResponseEntity<FollowDto>(followDto, HttpStatus.CREATED);
    }

    @DeleteMapping("/unfollow/{member-id}")
    public ResponseEntity unfollow(
            @PathVariable("{member-id}") Integer followedMemberId,
            @RequestHeader("Authorization") String authorization) {
        Integer followingMemberId = memberService.getTokenMember(authorization);
        followService.unfollow(followingMemberId, followedMemberId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/member/{member-id}/follower")
    public ResponseEntity<Page<FollowDto.ListResponse>> getFollowerList(
            Pageable pageable, @PathVariable Integer memberId
    ) {
        return ResponseEntity.ok(followService.getFollowerList(pageable, memberId));
    }

    @GetMapping("/member/{member-id}/following")
    public ResponseEntity<Page<FollowDto.ListResponse>> getFollowingList(
            Pageable pageable, @PathVariable Integer memberId
    ) {
        return ResponseEntity.ok(followService.getFollowingList(pageable, memberId));
    }
}