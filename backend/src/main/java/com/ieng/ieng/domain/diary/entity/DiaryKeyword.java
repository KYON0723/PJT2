package com.ieng.ieng.domain.diary.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Table(name ="DIARIES_KEYWORDS")
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class DiaryKeyword {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "DIARY_KEYWORD_SEQ")
    private Long diaryKeywordSequence;

    @ManyToOne()
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "DIARY_SEQ")
    private Diary diary;

    @Column(name = "DIARY_KEYWORD")
    private String diaryKeyword;

    @Builder
    public DiaryKeyword(Diary diary, String diaryKeyword){
        this.diary = diary;
        this.diaryKeyword = diaryKeyword;
    }
}
