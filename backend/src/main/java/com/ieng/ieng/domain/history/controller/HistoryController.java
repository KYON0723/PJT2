package com.ieng.ieng.domain.history.controller;

import com.ieng.ieng.domain.history.dto.*;
import com.ieng.ieng.domain.history.service.SentenceSubmitService;
import com.ieng.ieng.domain.history.service.StudyHistoryService;
import com.ieng.ieng.domain.history.service.TotalHistoryService;
import com.ieng.ieng.domain.history.service.WordSubmitService;
import com.ieng.ieng.global.response.CommonResponse;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/api/histories")
@RequiredArgsConstructor
public class HistoryController {
    private final StudyHistoryService studyHistoryService;
    private final WordSubmitService wordSubmitService;
    private final SentenceSubmitService sentenceSubmitService;

    private final TotalHistoryService totalHistoryService;
    final static Logger logger = LogManager.getLogger(HistoryController.class);

    @GetMapping()
    public ResponseEntity<?> getHistories(HttpServletRequest request, @RequestParam String date){
        String email = (String) request.getAttribute("email");
        TotalHistoryResponseDto totalHistoryResponseDto = totalHistoryService.getTotalHistories(email, date);
        return ResponseEntity.status(HttpStatus.OK).body(CommonResponse.createSuccess("전체 히스토리 조회 성공", totalHistoryResponseDto));
    }

    @GetMapping(value = "/studies")
    public ResponseEntity<?> getStudies(HttpServletRequest request, @RequestParam String date){
        String email = (String) request.getAttribute("email");
        logger.debug("getStudiesController");
        StudyHistoryResponseDto studyHistoryResponseDto = studyHistoryService.getStudyHistories(email, date);
        return ResponseEntity.status(HttpStatus.OK).body(CommonResponse.createSuccess("단어문장 히스토리 조회 성공",studyHistoryResponseDto));
    }
    @PostMapping(value = "/words")
    public ResponseEntity<?> submitWordHistories(HttpServletRequest request , @RequestBody WordHistoryRequestDto wordHistoryRequestDto){
        String email = (String) request.getAttribute("email");

        wordSubmitService.submit(email, wordHistoryRequestDto);
        return ResponseEntity.status(HttpStatus.OK).body(CommonResponse.createSuccess("wordHistory 제출 성공",null));
    }

    @PostMapping(value = "/sentences")
    public ResponseEntity<?> submitSentenceHistories(HttpServletRequest request, @RequestBody SentenceHistoryRequestDto sentenceHistoryRequestDto){
        String email = (String) request.getAttribute("email");

        List<SentenceSubmitDto> a = sentenceHistoryRequestDto.getSentenceSubmitList();
        logger.debug("[0] : "+a.get(0).getSentenceSequence() + a.get(0).getCorrect());
        logger.debug("[1] : "+a.get(1).getSentenceSequence() + a.get(1).getCorrect());
        logger.debug("[2] : "+a.get(2).getSentenceSequence() + a.get(2).getCorrect());

        sentenceSubmitService.submit(email, sentenceHistoryRequestDto);
        return ResponseEntity.status(HttpStatus.OK).body(CommonResponse.createSuccess("sentenceHistory 제출 성공",null));
    }
}
