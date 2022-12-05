package com.ieng.ieng.domain.word.service;

import com.ieng.ieng.domain.word.dto.WordGetResponseDto;

public interface WordService {
    WordGetResponseDto getWordList(String email, int number);
}
