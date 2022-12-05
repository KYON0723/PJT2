package com.ieng.ieng.domain.history.service;

import com.ieng.ieng.domain.history.dto.StudyHistoryResponseDto;
import com.ieng.ieng.domain.history.entity.SentenceHistory;
import com.ieng.ieng.domain.history.entity.WordHistory;
import com.ieng.ieng.domain.history.repository.SentenceHistoryRepository;
import com.ieng.ieng.domain.history.repository.WordHistoryRepository;
import com.ieng.ieng.domain.member.entity.Member;
import com.ieng.ieng.domain.member.repository.MemberRepository;
import com.ieng.ieng.domain.sentence.entity.Sentence;
import com.ieng.ieng.domain.word.entity.Word;
import com.ieng.ieng.global.exception.NoExistMemberException;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StudyHistoryServiceImpl implements StudyHistoryService {

    private final MemberRepository memberRepository;
    private final WordHistoryRepository wordHistoryRepository;
    private final SentenceHistoryRepository sentenceHistoryRepository;

    final static Logger logger = LogManager.getLogger(StudyHistoryServiceImpl.class);
    @Override
    public StudyHistoryResponseDto getStudyHistories(String email, String date) {
        Member member = memberRepository.findByEmail(email).orElseThrow(() -> new NoExistMemberException("존재하는 회원정보가 없습니다."));
        //해당 date 의 word 리스트 (correct, incorrect)
        List<WordHistory>totalWordList = wordHistoryRepository.findWordHistoriesByMemberAndWordHistoryDTTM(member,date);
        logger.debug("totalWordList Size: {}",totalWordList.size());
        List<Word>correctWordList = new ArrayList<>();
        List<Word>incorrectWordList= new ArrayList<>();
        for(WordHistory wordHistory : totalWordList){
            if(wordHistory.getWordHistoryPass()==true){
                correctWordList.add(wordHistory.getWord());
            }else if(wordHistory.getWordHistoryPass()==false){
                incorrectWordList.add(wordHistory.getWord());
            }
        }
        logger.debug("correctWordList Size: {}",correctWordList.size());
        logger.debug("incorrectWordList Size: {}",incorrectWordList.size());

        //해당 date 의 Sentence 리스트(corr, incorr)
        List<SentenceHistory>totalSentenceList =sentenceHistoryRepository.findSentenceHistoriesByMemberAndSentenceHistoryDTTM(member,date);
        List<Sentence>correctSentenceList = new ArrayList<>();
        List<Sentence>incorrectSentenceList = new ArrayList<>();
        for(SentenceHistory sentenceHistory : totalSentenceList){
            if(sentenceHistory.getSentenceHistoryPass()==true){
                correctSentenceList.add(sentenceHistory.getSentence());
            }else if(sentenceHistory.getSentenceHistoryPass()==false){
                incorrectSentenceList.add(sentenceHistory.getSentence());
            }
        }
        logger.debug("correctSentenceList Size: {}",correctSentenceList.size());
        logger.debug("incorrectSentenceList Size: {}",incorrectSentenceList.size());
        //build
        StudyHistoryResponseDto studyHistoryResponseDto = StudyHistoryResponseDto.builder()
                                                            .correctWordList(correctWordList)
                                                            .incorrectWordList(incorrectWordList)
                                                            .correctSentenceList(correctSentenceList)
                                                            .incorrectSentenceList(incorrectSentenceList)
                                                            .build();
        return studyHistoryResponseDto;
    }
}
