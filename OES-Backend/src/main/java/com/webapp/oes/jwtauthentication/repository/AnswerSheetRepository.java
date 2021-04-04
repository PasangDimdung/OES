package com.webapp.oes.jwtauthentication.repository;

import java.util.List;

import com.webapp.oes.jwtauthentication.model.AnswerSheet;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AnswerSheetRepository extends JpaRepository<AnswerSheet, Integer> {
    @Query("SELECT a FROM AnswerSheet a WHERE a.exam.id = :#{#answerSheet. exam . id} and  a.student.id = :#{#answerSheet. student . id} and a.subject.id = :#{#answerSheet. subject . id} and a.question.id = :#{#answerSheet. question . id}")
    AnswerSheet findAnswer(@Param("answerSheet") AnswerSheet answerSheet);

    @Query("SELECT a FROM AnswerSheet a WHERE a.exam.id = :#{#answerSheet. exam . id} and  a.student.id = :#{#answerSheet. student . id} and a.subject.id = :#{#answerSheet. subject . id}")
    List<AnswerSheet> findAnswer1(@Param("answerSheet") AnswerSheet answerSheet);
}
