package com.ieng.ieng.domain.member.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.ieng.ieng.domain.member.dto.*;
import com.ieng.ieng.domain.member.entity.Member;
import com.ieng.ieng.domain.member.repository.MemberRepository;
import com.ieng.ieng.global.exception.*;
import com.ieng.ieng.global.s3.S3UploaderServiceImpl;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService{
    private final MemberRepository memberRepository;
    private final AmazonS3Client amazonS3Client;
    private final S3UploaderServiceImpl s3UploaderService;
    @Value("${cloud.aws.s3.domain}")
    String s3Domain ;
    final static Logger logger = LogManager.getLogger(MemberServiceImpl.class);
    // 회원정보 확인
    @Override
    public MemberInfoResponseDto getMemberInfo(String email) {
        Member member = memberRepository.findByEmail(email).orElseThrow(() -> new NoExistMemberException("존재하는 회원정보가 없습니다."));
        MemberInfoResponseDto memberInfoResponseDto = new MemberInfoResponseDto(member);
        //String picturePath = "user/"+email+"/profile/profile.jpg";
        //memberInfoResponseDto.updatePicturePath(s3Domain + picturePath);

        return memberInfoResponseDto;
    }

    // 회원가입
    @Override
    public MemberResponseDto createMember(MemberRequestDto memberRequestDto, String refreshToken) {
        try {
            memberRequestDto.updateRefreshToken(refreshToken);
            Member member = memberRepository.save(memberRequestDto.toEntity());
            MemberResponseDto memberResponseDto = new MemberResponseDto(member);
            return memberResponseDto;
        }catch(DataIntegrityViolationException e){
            throw new DuplicateNicknameException("닉네임 중복");
        }
    }

    // 회원정보 수정
    @Override
    public MemberResponseDto updateMemberInfo(String email, MemberUpdateInfoRequestDto memberUpdateRequestDto){
        Member member = memberRepository.findByEmail(email).orElseThrow(() -> new NoExistMemberException("존재하는 회원정보가 없습니다."));

        try{
            member.updateInfo(memberUpdateRequestDto);
            memberRepository.save(member);
            MemberResponseDto memberResponseDto = new MemberResponseDto(member);
            return memberResponseDto;
        }catch (DataIntegrityViolationException e){
            throw new ExistNicknameException("존재하는 닉네임입니다.");
        }
    }
    // 회원정보 비밀번호 수정
    @Override
    public void updateMemberPassword(String email, MemberUpdatePasswordRequestDto memberUpdatePasswordRequestDto){
        Member member = memberRepository.findByEmail(email).orElseThrow(() -> new NoExistMemberException("존재하는 회원정보가 없습니다."));
        if(!member.getPassword().equals(memberUpdatePasswordRequestDto.getCurPassword())){
            throw new NoMatchCurPasswordException("현재 비밀번호가 맞지 않습니다.");
        }
        member.updatePassword(memberUpdatePasswordRequestDto);
        memberRepository.save(member);
        return ;

    }

    // 회원탈퇴
    @Override
    public void deleteMember(String email){
        Member member = memberRepository.findByEmail(email).orElseThrow(() -> new NoExistMemberException("존재하는 회원정보가 없습니다."));
        memberRepository.delete(member);
    }

    @Override
    public void updateRefreshToken(String email, String refreshToken) {
        Member member = memberRepository.findByEmail(email).orElseThrow(() -> new NoExistMemberException("존재하는 회원정보가 없습니다."));
        member.updateRefreshToken(refreshToken);
        memberRepository.save(member);
    }

    @Override
    public void uploadProfile(MultipartFile multipartFile, String email ){
        if(multipartFile.isEmpty()){
            throw new EmptyFileException("파일이 없습니다.");
        }
        Member member = memberRepository.findByEmail(email).orElseThrow(() -> new NoExistMemberException("존재하는 회원정보가 없습니다."));



        int index = multipartFile.getOriginalFilename().indexOf(".");
        String fileNameExtension = multipartFile.getOriginalFilename().substring(index);
        UUID uuid = UUID.randomUUID();
        String fileName= "user/"+email+"/profile"+"/"+uuid+fileNameExtension;

        member.updatePicturePath(s3Domain+fileName);
        memberRepository.save(member);
        s3UploaderService.uploadPicture(multipartFile, fileName);

        return;
    }

}
