package com.ieng.ieng.domain.history.service;

import com.ieng.ieng.domain.diary.entity.Diary;
import com.ieng.ieng.domain.diary.repository.DiaryRepository;
import com.ieng.ieng.domain.history.dto.TotalHistoryResponseDto;
import com.ieng.ieng.domain.history.entity.SentenceHistory;
import com.ieng.ieng.domain.history.entity.WordHistory;
import com.ieng.ieng.domain.history.repository.SentenceHistoryRepository;
import com.ieng.ieng.domain.history.repository.WordHistoryRepository;
import com.ieng.ieng.domain.member.entity.Member;
import com.ieng.ieng.domain.member.repository.MemberRepository;
import com.ieng.ieng.global.exception.NoExistMemberException;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TotalHistoryServiceImpl implements TotalHistoryService{
    private final MemberRepository memberRepository;

    private final WordHistoryRepository wordHistoryRepository;

    private final DiaryRepository diaryRepository;
    private final SentenceHistoryRepository sentenceHistoryRepository;

    final static Logger logger = LogManager.getLogger(StudyHistoryServiceImpl.class);
    @Override
    public TotalHistoryResponseDto getTotalHistories(String email, String date){
        Member member = memberRepository.findByEmail(email).orElseThrow(() -> new NoExistMemberException("존재하는 회원정보가 없습니다."));
        List<Diary> totalDiaryList = diaryRepository.findDiaryByMemberAndDiaryDTTMStartsWith(member, date);
        List<SentenceHistory> totalSentenceList = sentenceHistoryRepository.findSentenceHistoriesByMemberAndSentenceHistoryDTTMStartsWith(member,date);
        List<WordHistory> totalWordList = wordHistoryRepository.findWordHistoriesByMemberAndWordHistoryDTTMStartsWith(member, date);

        List<String> diaryList = new ArrayList<>();
        List<String> sentenceList = new ArrayList<>();
        List<String> wordList = new ArrayList<>();

        for(Diary diary : totalDiaryList){
            diaryList.add(diary.getDiaryDTTM());
        }

        for(SentenceHistory sentenceHistory : totalSentenceList){
            sentenceList.add(sentenceHistory.getSentenceHistoryDTTM());
        }
        for(WordHistory wordHistory : totalWordList){
            wordList.add(wordHistory.getWordHistoryDTTM());
        }


        TotalHistoryResponseDto totalHistoryResponseDto = TotalHistoryResponseDto.builder()
                .diary_histories(diaryList)
                .sentence_histories(sentenceList)
                .word_histories((wordList))
                .build();

        return totalHistoryResponseDto;
    }
}
