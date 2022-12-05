package com.ieng.ieng.domain.history.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

import java.util.List;


@Getter
public class SentenceHistoryRequestDto {

    @JsonProperty("data")
    private List<SentenceSubmitDto> sentenceSubmitList;
}
