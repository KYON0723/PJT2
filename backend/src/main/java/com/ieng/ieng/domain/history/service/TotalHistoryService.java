package com.ieng.ieng.domain.history.service;

import com.ieng.ieng.domain.history.dto.TotalHistoryResponseDto;

public interface TotalHistoryService {

    TotalHistoryResponseDto getTotalHistories(String email, String date);
}
