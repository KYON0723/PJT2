package com.ieng.ieng.domain.diary.entity;

import com.ieng.ieng.domain.member.entity.Member;
import com.ieng.ieng.domain.sentence.entity.Sentence;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;


@Table(name = "DIARIES")
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Diary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "DIARY_SEQ")
    private Long diarySequence;

    @ManyToOne()
    @JoinColumn(name = "MEMBER_SEQ")
    private Member member;
    @Column(name = "DIARY_PICTURE_PATH") //,nullable = false)
    private String diaryPicturePath;

    @Column(name = "DIARY_CONTENT")
    private String diaryContent;

    @Column(name = "DIARY_EMOTION")
    private String diaryEmotion;

    @Column(name = "DIARY_DTTM")
    private String diaryDTTM;

    @Builder
    public Diary(Member member, String diaryPicturePath, String diaryContent, String diaryEmotion, String diaryDTTM){
        this.member = member;
        this.diaryPicturePath = diaryPicturePath;
        this.diaryContent = diaryContent;
        this.diaryEmotion = diaryEmotion;
        this.diaryDTTM = diaryDTTM;
    }
    public void updateDiaryPicturePath(String diaryPicturePath){
        this.diaryPicturePath = diaryPicturePath;
    }
}
