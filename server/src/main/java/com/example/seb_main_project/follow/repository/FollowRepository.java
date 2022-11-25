package com.example.seb_main_project.follow.repository;

import com.example.seb_main_project.follow.entity.Follow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface FollowRepository extends JpaRepository<Follow, Integer> {
    // 팔로우 리스트
    public List<Follow> findByFollowingId(int following);

    // 팔로워 리스트
    public List<Follow> findByFollowerId(int follower);

    // 팔로우, 언팔로우 유무
    @Query(value = "select count(*) from follow where following = ?1 and follower = ?2", nativeQuery = true)
    public int findByFollowerIdAndFollowingId(int following, int follower);

    // unFollow
    @Transactional
    public void deleteByFollowerIdAndFollowingId(int following, int follower);
}
