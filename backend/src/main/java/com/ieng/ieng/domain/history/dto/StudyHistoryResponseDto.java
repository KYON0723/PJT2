package com.ieng.ieng.domain.history.dto;

import com.ieng.ieng.domain.sentence.entity.Sentence;
import com.ieng.ieng.domain.word.entity.Word;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class StudyHistoryResponseDto {
    List<Word> correctWordList;
    List<Word> incorrectWordList;
    List<Sentence> correctSentenceList;
    List<Sentence> incorrectSentenceList;

    @Builder
    public StudyHistoryResponseDto(List<Word> correctWordList, List<Word> incorrectWordList, List<Sentence> correctSentenceList, List<Sentence> incorrectSentenceList){
        this.correctWordList=correctWordList;
        this.incorrectWordList=incorrectWordList;
        this.correctSentenceList=correctSentenceList;
        this.incorrectSentenceList=incorrectSentenceList;
    }
}
