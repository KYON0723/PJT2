package com.ieng.ieng.domain.login.controller;

import com.ieng.ieng.domain.login.dto.LoginRequestDto;
import com.ieng.ieng.domain.login.service.LoginService;
import com.ieng.ieng.domain.member.dto.MemberInfoResponseDto;
import com.ieng.ieng.domain.member.service.MemberService;
import com.ieng.ieng.global.exception.NoExistMemberException;
import com.ieng.ieng.global.jwt.JwtService;
import com.ieng.ieng.global.response.CommonResponse;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/login")
@RequiredArgsConstructor
public class LoginController {

    private final LoginService loginService;
    private final MemberService memberService;
    private final JwtService jwtService;
    @Value("${cloud.aws.s3.domain}")
    String s3Domain ;
    final static Logger logger = LogManager.getLogger(LoginController.class);
    @PostMapping
    public ResponseEntity<?> getLocalLogin(@RequestBody LoginRequestDto loginRequestDto){

        String email = loginRequestDto.getEmail();
        logger.debug("email : " + email);

        String accessToken = jwtService.createAccessToken(email);
        String refreshToken = jwtService.createRefreshToken();

        HttpHeaders headers = loginService.createTokenHeader(accessToken, refreshToken);
        memberService.updateRefreshToken(email, refreshToken);
        MemberInfoResponseDto memberInfoResponseDto = loginService.loginIeng(loginRequestDto);

        return ResponseEntity.status(HttpStatus.OK).headers(headers).body(CommonResponse.createSuccess("로그인 성공적으로 완료 되었습니다.", memberInfoResponseDto));

    }
}
