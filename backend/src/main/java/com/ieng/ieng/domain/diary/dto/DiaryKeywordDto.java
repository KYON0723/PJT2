package com.ieng.ieng.domain.diary.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class DiaryKeywordDto {

    @JsonProperty("keyword")
    private String keyword;
}
