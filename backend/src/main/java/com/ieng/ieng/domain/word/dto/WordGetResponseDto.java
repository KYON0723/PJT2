package com.ieng.ieng.domain.word.dto;

import com.ieng.ieng.domain.word.entity.Word;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Set;

@Getter
@AllArgsConstructor
public class WordGetResponseDto {
    Set<Word> wordSet;
}
