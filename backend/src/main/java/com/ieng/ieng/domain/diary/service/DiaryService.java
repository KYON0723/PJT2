package com.ieng.ieng.domain.diary.service;

import com.ieng.ieng.domain.diary.dto.DiaryDeleteDto;
import com.ieng.ieng.domain.diary.dto.DiaryGetResponseDto;
import com.ieng.ieng.domain.diary.dto.DiaryRequestDto;
import org.springframework.web.multipart.MultipartFile;

public interface DiaryService {

    void createDiary(String email, DiaryRequestDto diaryRequestDto, MultipartFile multipartFile);

    void deleteDiary(String email, DiaryDeleteDto diaryDeleteDto);

    DiaryGetResponseDto diaryDetail(String email, String date);

    void uploadDiaryImage(MultipartFile multipartFile, String email);
}
