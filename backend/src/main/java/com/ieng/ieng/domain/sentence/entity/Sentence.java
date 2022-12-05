package com.ieng.ieng.domain.sentence.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Table(name="SENTENCES")
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Sentence {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "SENTENCE_SEQ")
    private Long sentenceSequence;

    @Column(name = "SENTENCE", nullable = false)
    private String sentence;

    @Column(name = "SENTENCE_MEAN", nullable = false)
    private String sentenceMean;

    @Column(name = "SENTENCE_PICTURE_PATH", nullable = false)
    private String sentencePicturePath;
}
