package com.example.seb_main_project.security.repository;

import com.example.seb_main_project.security.entity.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Integer> {
    Optional<RefreshToken> findRefreshTokenByTokenValue(String refreshToken);

    Optional<RefreshToken> findByMemberId(Integer memberId);

    void deleteByMemberId(Integer memberId);
}
