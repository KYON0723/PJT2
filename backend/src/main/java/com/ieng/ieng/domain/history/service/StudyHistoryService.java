package com.ieng.ieng.domain.history.service;

import com.ieng.ieng.domain.history.dto.StudyHistoryResponseDto;

public interface StudyHistoryService {
    StudyHistoryResponseDto getStudyHistories(String email, String date);
}
