package com.ieng.ieng.domain.login.service;

import com.ieng.ieng.domain.login.dto.LoginRequestDto;
import com.ieng.ieng.domain.member.dto.MemberInfoResponseDto;
import com.ieng.ieng.domain.member.entity.Member;
import com.ieng.ieng.domain.member.repository.MemberRepository;
import com.ieng.ieng.domain.member.service.MemberService;
import com.ieng.ieng.global.exception.NoExistMemberException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LoginServiceImpl implements LoginService{
    private final MemberService memberService;
    private final MemberRepository memberRepository;
    @Override
    public HttpHeaders createTokenHeader(String accessToken, String refreshToken) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization","Bearer "+accessToken);
        headers.add("refreshToken","Bearer "+refreshToken);

        return headers;
    }

    @Override
    public MemberInfoResponseDto loginIeng(LoginRequestDto loginRequestDto) {
        String email = loginRequestDto.getEmail();
        Member member = memberRepository.findByEmail(email).orElseThrow(() -> new NoExistMemberException("존재하는 회원정보가 없습니다."));

        if(!loginRequestDto.getPassword().equals(member.getPassword())){
            throw new NoExistMemberException("존재하는 회원정보가 없습니다.");
        }

        return memberService.getMemberInfo(email);
    }
}
