package com.ieng.ieng.domain.member.service;

import com.ieng.ieng.domain.member.dto.MemberGoogleRequestDto;
import com.ieng.ieng.domain.member.dto.MemberResponseDto;

public interface MemberGoogleService {
    MemberResponseDto signUpOauthGoogle(MemberGoogleRequestDto memberGoogleRequestDto, String refreshToken);
}
