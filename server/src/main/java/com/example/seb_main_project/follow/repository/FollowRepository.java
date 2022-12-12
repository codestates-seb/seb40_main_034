package com.example.seb_main_project.follow.repository;

import com.example.seb_main_project.follow.entity.Follow;
import com.example.seb_main_project.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FollowRepository extends JpaRepository<Follow, Integer> {
    Optional<Follow> findByFollowingAndFollower(Member targetMember, Member follower);


    Optional<List<Follow>> findFollowsByFollowing(Member following);

    Optional<List<Follow>> findFollowsByFollower(Member follower);
}
