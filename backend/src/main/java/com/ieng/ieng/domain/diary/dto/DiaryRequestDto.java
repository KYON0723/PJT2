package com.ieng.ieng.domain.diary.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

import java.util.List;

@Getter
public class DiaryRequestDto {

    @JsonProperty("content")
    private String content;

    @JsonProperty("emotion")
    private String emotion;

    @JsonProperty("keywords")
    private List<DiaryKeywordDto> diaryKeywordList;

}