package com.ieng.ieng.domain.login.service;

import com.ieng.ieng.domain.login.dto.LoginRequestDto;
import com.ieng.ieng.domain.member.dto.MemberInfoResponseDto;
import org.springframework.http.HttpHeaders;

public interface LoginService {
    HttpHeaders createTokenHeader(String accessToken , String refreshToken);
    MemberInfoResponseDto loginIeng(LoginRequestDto loginRequestDto);
}
