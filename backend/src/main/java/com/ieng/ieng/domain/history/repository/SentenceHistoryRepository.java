package com.ieng.ieng.domain.history.repository;

import com.ieng.ieng.domain.history.entity.SentenceHistory;
import com.ieng.ieng.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SentenceHistoryRepository extends JpaRepository<SentenceHistory, Long> {

    List<SentenceHistory> findSentenceHistoriesByMember(Member member);
    List<SentenceHistory> findSentenceHistoriesByMemberAndSentenceHistoryDTTM(Member member, String sentenceHistoryDTTM);

    List<SentenceHistory> findSentenceHistoriesByMemberAndSentenceHistoryDTTMStartsWith(Member member, String date);

}
