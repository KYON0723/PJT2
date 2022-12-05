package com.ieng.ieng.domain.sentence.service;

import com.ieng.ieng.domain.sentence.dto.SentenceGetResponseDto;

public interface SentenceService {
    SentenceGetResponseDto getSentenceList(String email, int number);
}
