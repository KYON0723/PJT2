package com.ieng.ieng.domain.diary.repository;

import com.ieng.ieng.domain.diary.entity.Diary;
import com.ieng.ieng.domain.diary.entity.DiaryKeyword;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DiaryKeywordRepository extends JpaRepository<DiaryKeyword, Long> {
    List<DiaryKeyword> findByDiary_DiarySequence(Long diarySequence);

}
