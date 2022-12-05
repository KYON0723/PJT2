package com.ieng.ieng.domain.history.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;


import java.util.List;

@Getter
//@AllArgsConstructor
public class WordHistoryRequestDto {

    @JsonProperty("data")
    private List<WordSubmitDto> wordSubmitList;
}
