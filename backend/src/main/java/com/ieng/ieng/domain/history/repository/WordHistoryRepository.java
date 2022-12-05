package com.ieng.ieng.domain.history.repository;

import com.ieng.ieng.domain.history.entity.WordHistory;
import com.ieng.ieng.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WordHistoryRepository extends JpaRepository<WordHistory,Long> {
    List<WordHistory> findWordHistoriesByMember(Member member);
    List<WordHistory> findWordHistoriesByMemberAndWordHistoryDTTM(Member member, String wordHistoryDTTM);

    List<WordHistory> findWordHistoriesByMemberAndWordHistoryDTTMStartsWith(Member member, String date);
}
