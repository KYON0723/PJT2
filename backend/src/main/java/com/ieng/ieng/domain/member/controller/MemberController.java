package com.ieng.ieng.domain.member.controller;

import com.ieng.ieng.domain.login.service.LoginService;
import com.ieng.ieng.domain.member.dto.*;
import com.ieng.ieng.domain.member.service.EmailService;
import com.ieng.ieng.domain.member.service.MemberGoogleService;
import com.ieng.ieng.domain.member.service.MemberService;
import com.ieng.ieng.global.exception.DuplicateNicknameException;
import com.ieng.ieng.global.jwt.JwtService;
import com.ieng.ieng.global.response.CommonResponse;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/members")
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;
    private final MemberGoogleService memberGoogleService;
    private final LoginService loginService;
    private final JwtService jwtService;

    private final EmailService emailService;
    final static Logger logger = LogManager.getLogger(MemberController.class);
    @GetMapping()
    public ResponseEntity<?> getMember(HttpServletRequest request){
        String email = (String) request.getAttribute("email");
        MemberInfoResponseDto memberInfoResponseDto = memberService.getMemberInfo(email);
        return ResponseEntity.status(HttpStatus.CREATED).body(CommonResponse.createSuccess("회원정보 확인 완료.", memberInfoResponseDto));
    }

    @PostMapping("/sign-up")
    public ResponseEntity<?> createMember(@RequestPart("profile_image")MultipartFile multipartFile, @RequestPart("data") MemberRequestDto memberRequestDto){
            logger.debug("api/sign-up");
            String email = memberRequestDto.getEmail();

            String accessToken = jwtService.createAccessToken(email);
            String refreshToken = jwtService.createRefreshToken();

            HttpHeaders headers = loginService.createTokenHeader(accessToken, refreshToken);

            MemberResponseDto memberResponseDto = memberService.createMember(memberRequestDto, refreshToken);
            logger.debug("done : createMember");
            memberService.uploadProfile(multipartFile , email);
            return ResponseEntity.status(HttpStatus.CREATED).headers(headers).body(CommonResponse.createSuccess("회원가입이 완료되었습니다.", memberResponseDto));
    }
    @PostMapping("google-sign-up")
    public ResponseEntity<?> createGoogleMember(@RequestPart("profile_image")MultipartFile multipartFile, @RequestPart("data")  MemberGoogleRequestDto memberGoogleRequestDto){

        logger.debug("api/google-sign-up");

        String refreshToken = jwtService.createRefreshToken();
        MemberResponseDto memberResponseDto = memberGoogleService.signUpOauthGoogle(memberGoogleRequestDto, refreshToken);
        String email = memberResponseDto.getEmail();

        memberService.uploadProfile(multipartFile , email);

        String accessToken = jwtService.createAccessToken(email);
        HttpHeaders headers = loginService.createTokenHeader(accessToken, refreshToken);

        return ResponseEntity.status(HttpStatus.CREATED).headers(headers).body(CommonResponse.createSuccess("구글 회원가입이 완료되었습니다.", memberResponseDto));
    }
    @PutMapping("/info")
    public ResponseEntity<?> updateMemberInfo(HttpServletRequest request, @RequestPart(value = "data") MemberUpdateInfoRequestDto memberUpdateRequestDto){
        String email = (String) request.getAttribute("email");
        logger.debug("email:{}" , email);
        MemberResponseDto memberResponseDto = memberService.updateMemberInfo(email, memberUpdateRequestDto);

        return ResponseEntity.status(HttpStatus.OK).body(CommonResponse.createSuccess("회원정보 수정이 완료되었습니다.",memberResponseDto));
    }
    @PutMapping("/info-image")
    public ResponseEntity<?> updateMemberInfo(HttpServletRequest request, @RequestPart(value = "profile_image", required = false) MultipartFile multipartFile ,@RequestPart(value = "data") MemberUpdateInfoRequestDto memberUpdateRequestDto){
        String email = (String) request.getAttribute("email");
        logger.debug("email:{}" , email);
        MemberResponseDto memberResponseDto = memberService.updateMemberInfo(email, memberUpdateRequestDto);

        logger.debug("profile_image is empty: {}",multipartFile.isEmpty());
        if(!multipartFile.isEmpty()){
            memberService.uploadProfile(multipartFile , email);
        }
        return ResponseEntity.status(HttpStatus.OK).body(CommonResponse.createSuccess("회원정보 수정이 완료되었습니다.",memberResponseDto));
    }
    @PutMapping("/password")
    public ResponseEntity<?> updateMemberPassword(HttpServletRequest request, @RequestBody MemberUpdatePasswordRequestDto memberUpdatePasswordRequestDto){
        String email = (String) request.getAttribute("email");
        logger.debug("email:{}" , email);
        memberService.updateMemberPassword(email, memberUpdatePasswordRequestDto);

        return ResponseEntity.status(HttpStatus.OK).body(CommonResponse.createSuccess("비밀번호 수정이 완료되었습니다.", null));
    }
    @DeleteMapping
    public ResponseEntity<?> deleteMember(HttpServletRequest request){
        String email = (String) request.getAttribute("email");
        logger.debug("email:{}" , email);
        memberService.deleteMember(email);

        return ResponseEntity.status(HttpStatus.OK).body(CommonResponse.createSuccess("회원탈퇴 완료되었습니다.", null));
    }
    @PostMapping("/email/check")
    public ResponseEntity<?> checkEmail(@RequestBody MemberEmailRequestDto memberEmailRequestDto){
        logger.debug(memberEmailRequestDto.getEmail());
        Boolean chk = emailService.checkEmail(memberEmailRequestDto.getEmail());
        logger.debug("chk:{}" , chk);
        if (chk==false){
            return ResponseEntity.status(HttpStatus.OK).body(CommonResponse.createSuccess("사용가능한 이메일입니다.",!chk));
        }
        return ResponseEntity.status(HttpStatus.OK).body(CommonResponse.createError("이미 존재하는 이메일 입니다."));
    }
    @PostMapping("/email/send")
    public ResponseEntity<?> sendEmail(@RequestBody MemberEmailRequestDto memberEmailRequestDto) throws Exception {
        emailService.sendSimpleMessage(memberEmailRequestDto.getEmail());
        return ResponseEntity.status(HttpStatus.OK).body(CommonResponse.createSuccess("이메일 전송이 완료 되었습니다.", null));
    }

    @PostMapping("/email/confirm")
    public ResponseEntity<?> confirmEmail(@RequestBody MemberEmailRequestDto memberEmailRequestDto){
        Boolean chk = emailService.confirmEmail(memberEmailRequestDto.getEmail(),memberEmailRequestDto.getCertificationNumber());
        if (chk==true){
            return ResponseEntity.status(HttpStatus.OK).body(CommonResponse.createSuccess("이메일 인증이 완료 되었습니다.",null));
        }
        return ResponseEntity.status(HttpStatus.OK).body(CommonResponse.createError("이메일 인증이 실패 되었습니다."));
    }

}
