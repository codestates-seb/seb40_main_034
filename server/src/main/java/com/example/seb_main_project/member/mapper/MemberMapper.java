package com.example.seb_main_project.member.mapper;

import com.example.seb_main_project.member.dto.AuthDto;
import com.example.seb_main_project.member.dto.ExistNickNameResponseDto;
import com.example.seb_main_project.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.WARN)
public interface MemberMapper {
    Member joinToMemberEntity(AuthDto.Join member);

    @Mapping(source = "response", target = "existNickname")
    ExistNickNameResponseDto booleanToExistNickNameResponseDto(Boolean response);
}
