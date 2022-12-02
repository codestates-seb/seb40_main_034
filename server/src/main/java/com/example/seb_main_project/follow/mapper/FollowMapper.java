package com.example.seb_main_project.follow.mapper;

import com.example.seb_main_project.follow.dto.FollowDto;
import com.example.seb_main_project.follow.entity.Follow;
import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(
        unmappedTargetPolicy = ReportingPolicy.ERROR,
        componentModel = "spring"
        )
public interface FollowMapper {

    FollowDto toFollowDto(Follow follow);
}
