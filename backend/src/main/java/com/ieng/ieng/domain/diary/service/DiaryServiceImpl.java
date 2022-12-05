package com.ieng.ieng.domain.diary.service;

import com.ieng.ieng.domain.diary.dto.DiaryDeleteDto;
import com.ieng.ieng.domain.diary.dto.DiaryGetResponseDto;
import com.ieng.ieng.domain.diary.dto.DiaryKeywordDto;
import com.ieng.ieng.domain.diary.dto.DiaryRequestDto;
import com.ieng.ieng.domain.diary.entity.Diary;
import com.ieng.ieng.domain.diary.entity.DiaryKeyword;
import com.ieng.ieng.domain.diary.repository.DiaryKeywordRepository;
import com.ieng.ieng.domain.diary.repository.DiaryRepository;
import com.ieng.ieng.domain.member.entity.Member;
import com.ieng.ieng.domain.member.repository.MemberRepository;
import com.ieng.ieng.global.exception.*;
import com.ieng.ieng.global.s3.S3UploaderServiceImpl;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import org.hibernate.PropertyValueException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.IncorrectResultSizeDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;


@Service
@RequiredArgsConstructor
public class DiaryServiceImpl implements DiaryService{

    private final MemberRepository memberRepository;
    private final DiaryRepository diaryRepository;

    private final DiaryKeywordRepository diaryKeywordRepository;
    private final S3UploaderServiceImpl s3UploaderService;

    @Value("${cloud.aws.s3.domain}")
    String s3Domain ;

    final static Logger logger = LogManager.getLogger(DiaryServiceImpl.class);
    @Override
    public DiaryGetResponseDto diaryDetail(String email, String date){
        Member member = memberRepository.findByEmail(email).orElseThrow(() -> new NoExistMemberException("존재하는 회원정보가 없습니다."));
        DiaryGetResponseDto diaryGetResponseDto;
        Diary diary = null;
        //없으면
        if(!diaryRepository.existsByMemberAndDiaryDTTM(member, date)){
            diaryGetResponseDto  = DiaryGetResponseDto.builder()
                    .build();
            return diaryGetResponseDto;
        }
        //있으면
        try {
            if(diaryRepository.existsByMemberAndDiaryDTTM(member, date)) {
                diary = diaryRepository.findDiaryByMemberAndDiaryDTTM(member, date);
            }
        }catch (IncorrectResultSizeDataAccessException e){
            throw new DuplicateDiaryException("해당 날짜에 일기가 두개인 오류 발생.");
        }

        List<DiaryKeyword> diaryKeywordList = diaryKeywordRepository.findByDiary_DiarySequence(diary.getDiarySequence());
        List<String> diaryKeywords = new ArrayList<>();
        for(DiaryKeyword diaryKeyword :diaryKeywordList){
            diaryKeywords.add(diaryKeyword.getDiaryKeyword());
        }

        diaryGetResponseDto  = DiaryGetResponseDto.builder()
                .diarySequence(diary.getDiarySequence())
                .memberSequence(member.getMemberSequence())
                .diaryPicturePath(diary.getDiaryPicturePath())
                .diaryContent(diary.getDiaryContent())
                .diaryEmotion(diary.getDiaryEmotion())
                .diaryDTTM(diary.getDiaryDTTM())
                .diaryKeywordList(diaryKeywords)
                .build();

        return diaryGetResponseDto;
    }



    @Override
    public void createDiary(String email, DiaryRequestDto diaryRequestDto, MultipartFile multipartFile){

        Member member = memberRepository.findByEmail(email).orElseThrow(() -> new NoExistMemberException("존재하는 회원정보가 없습니다."));
        Diary diary = null;

        LocalDate date = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        if(diaryRepository.existsByMemberAndDiaryDTTM(member,date.format(formatter))){
            throw new ExistDiaryException("오늘 이미 일기 작성 완료.");
        }


        Diary diary2 = diaryRepository.findDiaryByMemberAndDiaryDTTM(member, date.format(formatter));

        if(multipartFile.isEmpty()){
            throw new EmptyFileException("사진 파일은 필수 값입니다.");
        }

        diary = Diary.builder()
                .member(member)
                .diaryContent(diaryRequestDto.getContent())
                .diaryEmotion(diaryRequestDto.getEmotion())
                .diaryDTTM(date.format(formatter))
                .build();
        diaryRepository.save(diary);


        List<DiaryKeywordDto> diaryKeywordList = diaryRequestDto.getDiaryKeywordList();
        for(DiaryKeywordDto diaryKeywordDto : diaryKeywordList){
            DiaryKeyword diaryKeyword = DiaryKeyword.builder()
                    .diaryKeyword(diaryKeywordDto.getKeyword())
                    .diary(diary)
                    .build();
            diaryKeywordRepository.save(diaryKeyword);
        }
        return;
    }
    @Override
    public void uploadDiaryImage(MultipartFile multipartFile, String email) {
        Member member = memberRepository.findByEmail(email).orElseThrow(() -> new NoExistMemberException("존재하는 회원정보가 없습니다."));

        if(multipartFile.isEmpty()){
            throw new EmptyFileException("파일이 없습니다.");
        }


        LocalDate date = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String today = date.format(formatter);

        int index = multipartFile.getOriginalFilename().indexOf(".");
        String fileNameExtension = multipartFile.getOriginalFilename().substring(index);
        UUID uuid = UUID.randomUUID();
        String fileName = "user/" + email + "/diary" + "/" + today + "/" + uuid + fileNameExtension;

        Diary diary = diaryRepository.findDiaryByMemberAndDiaryDTTM(member, today);
        diary.updateDiaryPicturePath(s3Domain + fileName);
        diaryRepository.save(diary);
        s3UploaderService.uploadPicture(multipartFile, fileName);

    }
    @Override
    public void deleteDiary(String email, DiaryDeleteDto diaryDeleteDto){
        Member member = memberRepository.findByEmail(email).orElseThrow(() -> new NoExistMemberException("존재하는 회원정보가 없습니다."));

        if (diaryRepository.existsByMemberAndDiaryDTTM(member, diaryDeleteDto.getDate())){
            Diary diary = diaryRepository.findDiaryByMemberAndDiaryDTTM(member, diaryDeleteDto.getDate());
            diaryRepository.delete((diary));
        }
        else{
            throw new EmptyDiaryException("해당날짜에 조회되는 일기가 없습니다.");
        }

    }

}
