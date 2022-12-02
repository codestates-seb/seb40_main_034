package com.example.seb_main_project.follow.repository;

import com.example.seb_main_project.follow.entity.Follow;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import java.util.List;
import java.util.Optional;

public interface FollowRepository extends JpaRepository<Follow, Integer> {

    @Query("select f from Follow f where f.followingMember.id = :memberId")
    Page<Follow> findFollowerList(Pageable pageable, Integer memberId);

    @Query("select f from Follow f where f.followedMember.id = :memberId")
    Page<Follow> findFollowingList(Pageable pageable, Integer memberId);

    Optional<Follow> findByFollowingMemberIdAndFollowedMemberId(Integer followingMemberId, Integer followedMemberId);

}
