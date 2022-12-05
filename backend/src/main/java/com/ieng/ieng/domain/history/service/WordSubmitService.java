package com.ieng.ieng.domain.history.service;

import com.ieng.ieng.domain.history.dto.WordHistoryRequestDto;

public interface WordSubmitService {
    void submit(String email, WordHistoryRequestDto wordHistoryRequestDto);
}
