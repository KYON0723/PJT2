package com.ieng.ieng.domain.diary.controller;


import com.ieng.ieng.domain.diary.dto.DiaryDeleteDto;
import com.ieng.ieng.domain.diary.dto.DiaryGetResponseDto;
import com.ieng.ieng.domain.diary.dto.DiaryRequestDto;
import com.ieng.ieng.domain.diary.service.DiaryService;
import com.ieng.ieng.global.response.CommonResponse;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/diaries")
@RequiredArgsConstructor
public class DiaryController {


    private final DiaryService diaryService;

    final static Logger logger = LogManager.getLogger(DiaryController.class);

    @GetMapping()
    public ResponseEntity<?> diaryDetail(HttpServletRequest request, @RequestParam("date") String date){
        String email = (String)request.getAttribute("email");
        DiaryGetResponseDto diaryGetResponseDto = diaryService.diaryDetail(email, date);
        return ResponseEntity.status(HttpStatus.OK).body(CommonResponse.createSuccess("그림일기 조회 성공", diaryGetResponseDto));
    }

    @PostMapping
    public ResponseEntity<?> createDiary(HttpServletRequest request, @RequestPart("diary_image")MultipartFile multipartFile, @RequestPart("data") DiaryRequestDto diaryRequestDto){
        String email = (String)request.getAttribute("email");
        diaryService.createDiary(email, diaryRequestDto, multipartFile);
        diaryService.uploadDiaryImage(multipartFile , email);
        return ResponseEntity.status(HttpStatus.OK).body(CommonResponse.createSuccess("그림일기 작성 성공",null));
    }
    @DeleteMapping
    public ResponseEntity<?> deleteDiary(HttpServletRequest request, @RequestBody DiaryDeleteDto diaryDeleteDto){
        String email = (String)request.getAttribute("email");
        diaryService.deleteDiary(email, diaryDeleteDto);
        return ResponseEntity.status(HttpStatus.OK).body(CommonResponse.createSuccess("그림일기 삭제 성공",null));
    }

}
