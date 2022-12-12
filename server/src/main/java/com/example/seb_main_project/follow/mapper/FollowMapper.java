package com.example.seb_main_project.follow.mapper;

import com.example.seb_main_project.follow.dto.FollowDto;
import com.example.seb_main_project.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.WARN)
public interface FollowMapper {
    @Mapping(source = "id", target = "memberId")
    FollowDto.responseMemberDto MemberToResponseMemberDto(Member member);

    List<FollowDto.responseMemberDto> MemberToResponseMemberDto(List<Member> members);
}
