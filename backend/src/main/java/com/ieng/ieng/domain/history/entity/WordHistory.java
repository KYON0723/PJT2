package com.ieng.ieng.domain.history.entity;

import com.ieng.ieng.domain.member.entity.Member;
import com.ieng.ieng.domain.word.entity.Word;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Table(name = "WORDS_HISTORIES")
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class WordHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "WORD_HISTORY_SEQ")
    private Long wordHistorySequence;

    @ManyToOne
    @JoinColumn(name = "MEMBER_SEQ")
    private Member member;

    @ManyToOne()
    @JoinColumn(name = "WORD_SEQ")
    private Word word;

    @Column(name = "WORD_HISTORY_PASS")
    private boolean wordHistoryPass;

    @Column(name = "WORD_HISTORY_DTTM")
    private String wordHistoryDTTM;

    @Builder
    public WordHistory(Word word,boolean wordHistoryPass,String wordHistoryDTTM, Member member){
        this.word = word;
        this.wordHistoryPass = wordHistoryPass;
        this.wordHistoryDTTM = wordHistoryDTTM;
        this.member = member;
    }

    public boolean getWordHistoryPass(){
        return this.wordHistoryPass;
    }
}
