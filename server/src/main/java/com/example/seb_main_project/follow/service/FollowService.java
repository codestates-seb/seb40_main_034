package com.example.seb_main_project.follow.service;

import com.example.seb_main_project.exception.BusinessLogicException;
import com.example.seb_main_project.exception.ExceptionCode;
import com.example.seb_main_project.follow.dto.FollowDto;
import com.example.seb_main_project.follow.entity.Follow;
import com.example.seb_main_project.follow.mapper.FollowMapper;
import com.example.seb_main_project.follow.repository.FollowRepository;
import com.example.seb_main_project.member.entity.Member;
import com.example.seb_main_project.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class FollowService {

    private final FollowRepository followRepository;
    private final MemberRepository memberRepository;
    private final FollowMapper followMapper;


    @Transactional
    public FollowDto follow(Integer followingMemberId, Integer followedMemberId) {
        Member followingMember = memberRepository.findById(followingMemberId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        Member followedMember = memberRepository.findById(followedMemberId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        followRepository.findByFollowingMemberIdAndFollowedMemberId(followingMember.getId(), followedMember.getId())
                .ifPresent(follow -> {
                    throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
                });

        Follow follow = Follow.builder()
                .followingMember(followingMember)
                .followedMember(followedMember)
                .build();

        followRepository.save(follow);

        return followMapper.toFollowDto(follow);
    }

    @Transactional
    public void unfollow(Integer followingMemberId, Integer followId) {
        Follow follow = followRepository.findById(followId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        if (!follow.getFollowingMember().getId().equals(followingMemberId)) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
        }

        followRepository.delete(follow);
    }

    public Page<FollowDto.ListResponse> getFollowerList(Pageable pageable, Integer memberId) {
        return followRepository.findFollowerList(pageable, memberId)
                .map(f -> FollowDto.ListResponse.fromEntity(f.getFollowedMember()));
    }

    public Page<FollowDto.ListResponse> getFollowingList(Pageable pageable, Integer memberId) {
        return followRepository.findFollowingList(pageable, memberId)
                .map(f -> FollowDto.ListResponse.fromEntity(f.getFollowingMember()));
    }
}
