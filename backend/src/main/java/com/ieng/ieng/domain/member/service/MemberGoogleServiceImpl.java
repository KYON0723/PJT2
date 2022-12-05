package com.ieng.ieng.domain.member.service;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.ieng.ieng.domain.member.dto.MemberGoogleRequestDto;
import com.ieng.ieng.domain.member.dto.MemberResponseDto;
import com.ieng.ieng.domain.member.entity.Member;
import com.ieng.ieng.domain.member.repository.MemberRepository;
import com.ieng.ieng.global.exception.DuplicateNicknameException;
import com.ieng.ieng.global.exception.NoGoogleAuthorizeException;
import com.ieng.ieng.global.jwt.JwtService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;

@Service
public class MemberGoogleServiceImpl implements MemberGoogleService{
    private final GoogleIdTokenVerifier verifier;
    private final MemberRepository memberRepository;
    private final JwtService jwtService;

    final static Logger logger = LogManager.getLogger(MemberGoogleServiceImpl.class);

    public MemberGoogleServiceImpl(@Value("${google.client.id}") String clientId, MemberRepository memberRepository,  JwtService jwtService) {
        NetHttpTransport transport = new NetHttpTransport();
        JsonFactory jsonFactory = new JacksonFactory();
        this.memberRepository = memberRepository;
        this.jwtService = jwtService;
        verifier = new GoogleIdTokenVerifier.Builder(transport, jsonFactory)
                .setAudience(Collections.singletonList(clientId))
                .build();
    }

    @Override
    public MemberResponseDto signUpOauthGoogle(MemberGoogleRequestDto memberGoogleRequestDto, String refreshToken) {
        try{
            GoogleIdToken googleIdToken = verifier.verify(memberGoogleRequestDto.getIdToken());
            if(googleIdToken==null) throw new NoGoogleAuthorizeException("구글 회원 정보 오류.");



            GoogleIdToken.Payload payload = googleIdToken.getPayload();
            String email = payload.getEmail();
            Member member = Member.builder()
                            .email(email)
                            .nickname(memberGoogleRequestDto.getNickname())
                            .memberYMD(memberGoogleRequestDto.getMemberYMD())
                            .provider("google")
                            .picturePath("")
                            .refreshToken(refreshToken)
                            .build();
            memberRepository.save(member);
            MemberResponseDto memberResponseDto = new MemberResponseDto(member);
            return memberResponseDto;
        }
        catch (GeneralSecurityException | IOException e){
            return null;
        }catch (DataIntegrityViolationException e){
            throw new DuplicateNicknameException("닉네임 중복");
        }
    }
}
