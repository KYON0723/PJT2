package com.ieng.ieng.domain.sentence.controller;


import com.ieng.ieng.domain.sentence.dto.SentenceGetResponseDto;
import com.ieng.ieng.domain.sentence.service.SentenceService;
import com.ieng.ieng.global.response.CommonResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/sentences")
@RequiredArgsConstructor
public class SentenceController {

    private final SentenceService SentenceService;

    @GetMapping
    public ResponseEntity<?> getSentenceList(HttpServletRequest request, @RequestParam("number")int number){
        String email = (String) request.getAttribute("email");
        SentenceGetResponseDto SentenceResponseDto = SentenceService.getSentenceList(email, number);
        return ResponseEntity.status(HttpStatus.OK).body(CommonResponse.createSuccess("sentence 성공",SentenceResponseDto));
    }
}
