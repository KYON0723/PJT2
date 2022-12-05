package com.ieng.ieng.domain.history.service;


import com.ieng.ieng.domain.history.dto.SentenceHistoryRequestDto;
import com.ieng.ieng.domain.history.dto.SentenceSubmitDto;
import com.ieng.ieng.domain.history.entity.SentenceHistory;
import com.ieng.ieng.domain.history.repository.SentenceHistoryRepository;
import com.ieng.ieng.domain.member.entity.Member;
import com.ieng.ieng.domain.member.repository.MemberRepository;
import com.ieng.ieng.domain.sentence.entity.Sentence;
import com.ieng.ieng.domain.sentence.repository.SentenceRepository;
import com.ieng.ieng.global.exception.NoExistMemberException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SentenceSubmitServiceImpl implements SentenceSubmitService {

    private final SentenceHistoryRepository sentenceHistoryRepository;

    private final SentenceRepository sentenceRepository;

    private final MemberRepository memberRepository;

    @Override
    public void submit(String email, SentenceHistoryRequestDto sentenceHistoryRequestDto){
        Member member = memberRepository.findByEmail(email).orElseThrow(() -> new NoExistMemberException("존재하는 회원정보가 없습니다."));

        List<SentenceSubmitDto> sentenceSubmitList = sentenceHistoryRequestDto.getSentenceSubmitList();
        for(SentenceSubmitDto sentenceSubmit : sentenceSubmitList){
            Long sentenceSequence = sentenceSubmit.getSentenceSequence();
            Sentence sentence = sentenceRepository.findSentenceBySentenceSequence(sentenceSequence);
            LocalDate date = LocalDate.now();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

            SentenceHistory sentenceHistory = SentenceHistory.builder()
                    .sentence(sentence)
                    .sentenceHistoryPass(sentenceSubmit.getCorrect())
                    .sentenceHistoryDTTM(date.format(formatter))
                    .member(member)
                    .build();
            sentenceHistoryRepository.save(sentenceHistory);
        }
        return;

    }
}
