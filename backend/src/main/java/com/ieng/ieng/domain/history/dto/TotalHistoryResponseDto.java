package com.ieng.ieng.domain.history.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class TotalHistoryResponseDto {

    List<String> diary_histories;

    List<String> word_histories;

    List<String> sentence_histories;

    @Builder
    public TotalHistoryResponseDto(List<String> diary_histories, List<String> word_histories, List<String> sentence_histories ){
        this.diary_histories= diary_histories;
        this.word_histories = word_histories;
        this.sentence_histories =sentence_histories;
    }

}
