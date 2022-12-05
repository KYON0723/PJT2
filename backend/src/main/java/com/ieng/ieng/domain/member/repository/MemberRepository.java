package com.ieng.ieng.domain.member.repository;

import com.ieng.ieng.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member,Long> {
    Optional<Member> findByEmail(String email);
    Member findByNickname(String nickname);
    Optional<Member> findByRefreshToken(String refreshToken);

    boolean existsByEmail(String email);
}
