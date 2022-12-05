package com.ieng.ieng.domain.history.service;

import com.ieng.ieng.domain.history.dto.SentenceHistoryRequestDto;

public interface SentenceSubmitService {

    void submit(String email, SentenceHistoryRequestDto sentenceHistoryRequestDto);
}
