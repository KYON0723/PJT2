package com.ieng.ieng.domain.history.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
//@AllArgsConstructor
public class WordSubmitDto {
    @JsonProperty("word_seq")
    private Long wordSequence;
    @JsonProperty("is_correct")
    private boolean correct;

    public boolean getCorrect(){
        return this.correct;
    }
}
