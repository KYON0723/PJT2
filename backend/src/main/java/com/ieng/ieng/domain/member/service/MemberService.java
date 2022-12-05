package com.ieng.ieng.domain.member.service;

import com.ieng.ieng.domain.member.dto.*;
import org.springframework.web.multipart.MultipartFile;

public interface MemberService {
    MemberResponseDto createMember(MemberRequestDto memberRequestDto, String refreshToken);
    MemberResponseDto updateMemberInfo(String email, MemberUpdateInfoRequestDto memberUpdateRequestDto);
    void updateMemberPassword(String email, MemberUpdatePasswordRequestDto memberUpdatePasswordRequestDto);

    MemberInfoResponseDto getMemberInfo(String email);
    void deleteMember(String email);
    void updateRefreshToken(String email, String refreshToken);
    void uploadProfile(MultipartFile multipartFile, String email);
}
