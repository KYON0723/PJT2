package com.ieng.ieng.domain.sentence.repository;

import com.ieng.ieng.domain.sentence.entity.Sentence;
import com.ieng.ieng.domain.word.entity.Word;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SentenceRepository extends JpaRepository<Sentence,Long> {
    List<Sentence> findAll();

    Sentence findSentenceBySentenceSequence(Long sentenceSequence);
}
