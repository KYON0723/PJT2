package com.ieng.ieng.domain.word.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Table(name="WORDS")
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Word {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "WORD_SEQ")
    private Long wordSequence;

    @Column(name = "WORD", nullable = false)
    private String word;

    @Column(name = "WORD_MEAN", nullable = false)
    private String wordMean;

    @Column(name = "WORD_PICTURE_PATH", nullable = false)
    private String wordPicturePath;
}
