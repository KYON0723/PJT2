package com.ieng.ieng.domain.diary.dto;

import com.ieng.ieng.domain.diary.entity.Diary;
import com.ieng.ieng.domain.diary.entity.DiaryKeyword;
import com.ieng.ieng.domain.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.util.List;


@Getter

public class DiaryGetResponseDto {
    private Long diarySequence;
    private Long memberSequence;
    private String diaryPicturePath;
    private String diaryContent;
    private String diaryEmotion;
    private String diaryDTTM;

    List<String> diaryKeywordList;

    @Builder
    public DiaryGetResponseDto(Long memberSequence, Long diarySequence, String diaryPicturePath, String diaryContent, String diaryEmotion, String diaryDTTM, List<String> diaryKeywordList){
        this.memberSequence = memberSequence;
        this.diarySequence = diarySequence;
        this.diaryPicturePath = diaryPicturePath;
        this.diaryContent = diaryContent;
        this.diaryEmotion = diaryEmotion;
        this.diaryDTTM = diaryDTTM;
        this.diaryKeywordList = diaryKeywordList;
    }
}
