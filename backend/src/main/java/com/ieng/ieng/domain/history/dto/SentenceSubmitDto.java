package com.ieng.ieng.domain.history.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class SentenceSubmitDto {
    @JsonProperty("sentence_seq")
    private Long sentenceSequence;

    @JsonProperty("is_correct")
    private boolean correct;

    public boolean getCorrect() { return this.correct; }
}
