package com.ieng.ieng.domain.sentence.service;

import com.ieng.ieng.domain.history.entity.SentenceHistory;
import com.ieng.ieng.domain.history.repository.SentenceHistoryRepository;
import com.ieng.ieng.domain.member.entity.Member;
import com.ieng.ieng.domain.member.repository.MemberRepository;
import com.ieng.ieng.domain.sentence.repository.SentenceRepository;
import com.ieng.ieng.domain.sentence.dto.SentenceGetResponseDto;
import com.ieng.ieng.domain.sentence.entity.Sentence;

import com.ieng.ieng.domain.word.service.WordServiceImpl;
import com.ieng.ieng.global.exception.NoExistMemberException;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class SentenceServiceImpl implements SentenceService{
    private final SentenceRepository sentenceRepository;

    private final SentenceHistoryRepository sentenceHistoryRepository;

    private final MemberRepository memberRepository;

    final static Logger logger = LogManager.getLogger(WordServiceImpl.class);

    @Override
    public SentenceGetResponseDto getSentenceList(String email, int number){
        Member member = memberRepository.findByEmail(email).orElseThrow(() -> new NoExistMemberException("존재하는 회원정보가 없습니다."));
        //logic
        //Total 문제 배열 선언
        List<Sentence> totalSentenceList = sentenceRepository.findAll();
        logger.debug("totalHis size : {}", totalSentenceList.size());
        //sentencehistory 배열 선언
        List<SentenceHistory> sentenceHistoryList = sentenceHistoryRepository.findSentenceHistoriesByMember(member);
        logger.debug("sentenceHis size : {}", sentenceHistoryList.size());
        //sentenceTrueList 에 sentenceHistoryList 중 true 인 녀석들만 담을것.
        List<Sentence> sentenceTrueList = new ArrayList<>();
        //true 인 녀석만 담기.
        for(SentenceHistory sentenceHistory : sentenceHistoryList){
            if(sentenceHistory.getSentenceHistoryPass()==true){
                sentenceTrueList.add(sentenceHistory.getSentence());
            }
        }
        logger.debug("sentenceTrueList size : {}", sentenceTrueList.size());
        //totalSentenceList -sentenceTrueList
        totalSentenceList.removeAll(sentenceTrueList);
        logger.debug("final totalSentenceList size : {}", totalSentenceList.size());

        //문제 랜덤 추출출
        Random rnd = new Random();

        Set<Sentence> sentenceSet = new HashSet<>();
        while( sentenceSet.size() < number){
            int randomNum = rnd.nextInt(totalSentenceList.size());
            Sentence sentence = totalSentenceList.get(randomNum);
            if(sentenceSet.contains(sentence)){
                continue;
            }else{
                sentenceSet.add(sentence);
            }
        }
        SentenceGetResponseDto sentenceGetResponseDto = new SentenceGetResponseDto(sentenceSet);
        return sentenceGetResponseDto;
    }
}
