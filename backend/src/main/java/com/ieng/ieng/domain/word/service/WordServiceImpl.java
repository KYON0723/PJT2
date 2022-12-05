package com.ieng.ieng.domain.word.service;

import com.ieng.ieng.domain.history.entity.WordHistory;
import com.ieng.ieng.domain.history.repository.WordHistoryRepository;
import com.ieng.ieng.domain.member.entity.Member;
import com.ieng.ieng.domain.member.repository.MemberRepository;
import com.ieng.ieng.domain.word.dto.WordGetResponseDto;
import com.ieng.ieng.domain.word.entity.Word;
import com.ieng.ieng.domain.word.repository.WordRepository;
import com.ieng.ieng.global.exception.NoExistMemberException;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class WordServiceImpl implements WordService{


    private final WordRepository wordRepository;
    private final WordHistoryRepository wordHistoryRepository;
    private final MemberRepository memberRepository;

    final static Logger logger = LogManager.getLogger(WordServiceImpl.class);
    @Override
    public WordGetResponseDto getWordList(String email,int number){
        Member member = memberRepository.findByEmail(email).orElseThrow(() -> new NoExistMemberException("존재하는 회원정보가 없습니다."));

        //Total 문제 배열 선언
        List<Word> totalWordList = wordRepository.findAll();
        logger.debug("totalHis size : {}", totalWordList.size());
        //wordhistory 배열 선언
        List<WordHistory> wordHistoryList = wordHistoryRepository.findWordHistoriesByMember(member);
        logger.debug("wordHis size : {}", wordHistoryList.size());
        //wordTrueList 에 wordHistoryList 중 true 인 녀석들만 담을것.
        List<Word> wordTrueList = new ArrayList<>();
        //true 인 녀석만 담기.
        for(WordHistory wordHistory : wordHistoryList){
            if(wordHistory.getWordHistoryPass()==true){
                wordTrueList.add(wordHistory.getWord());
            }
        }
        logger.debug("wordTrueList size : {}", wordTrueList.size());
        //totalWordList -wordTrueList
        totalWordList.removeAll(wordTrueList);
        logger.debug("final totalWordList size : {}", totalWordList.size());

        //문제 랜덤 추출출
        Random rnd = new Random();

        Set<Word> wordSet = new HashSet<>();
        while( wordSet.size() < number){
            int randomNum = rnd.nextInt(totalWordList.size());
            Word word = totalWordList.get(randomNum);
            if(wordSet.contains(word)){
                continue;
            }else{
                wordSet.add(word);
            }
        }
        WordGetResponseDto wordGetResponseDto = new WordGetResponseDto(wordSet);
        return wordGetResponseDto;
    }
}
