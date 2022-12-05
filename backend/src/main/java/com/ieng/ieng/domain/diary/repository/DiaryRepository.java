package com.ieng.ieng.domain.diary.repository;

import com.ieng.ieng.domain.diary.entity.Diary;
import com.ieng.ieng.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface DiaryRepository extends JpaRepository<Diary,Long> {
    Diary findDiaryByMemberAndDiaryDTTM(Member member, String diaryDTTM);
    boolean existsByMemberAndDiaryDTTM(Member member, String diaryDTTM);
    List<Diary> findDiaryByMemberAndDiaryDTTMStartsWith(Member member, String date);



}
