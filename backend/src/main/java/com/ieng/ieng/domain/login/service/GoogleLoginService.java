package com.ieng.ieng.domain.login.service;

import com.ieng.ieng.domain.login.dto.GoogleLoginRequestDto;
import com.ieng.ieng.domain.member.dto.MemberInfoResponseDto;

public interface GoogleLoginService {
    MemberInfoResponseDto loginOAuthGoogle(GoogleLoginRequestDto googleLoginRequestDto);
}
