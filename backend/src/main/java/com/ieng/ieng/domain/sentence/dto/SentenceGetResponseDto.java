package com.ieng.ieng.domain.sentence.dto;


import com.ieng.ieng.domain.sentence.entity.Sentence;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Set;

@Getter
@AllArgsConstructor
public class SentenceGetResponseDto {
    Set<Sentence> sentenceSet;
}
