package com.ieng.ieng.domain.word.repository;

import com.ieng.ieng.domain.word.entity.Word;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WordRepository extends JpaRepository<Word,Long> {
    List<Word> findAll();
    Word findWordByWordSequence(Long wordSequence);
}
