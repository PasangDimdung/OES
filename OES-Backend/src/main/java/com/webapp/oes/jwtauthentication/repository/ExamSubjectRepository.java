package com.webapp.oes.jwtauthentication.repository;

import java.util.List;

import com.webapp.oes.jwtauthentication.model.ExamSubject;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ExamSubjectRepository extends JpaRepository<ExamSubject, Long> {

    @Query("SELECT e FROM ExamSubject e WHERE e.exam.id = :examId")
    List<ExamSubject> findSubject(@Param("examId") Long examId);

    @Query("SELECT e FROM ExamSubject e WHERE e.exam.id = :examId AND e.status = 'completed'")
    List<ExamSubject>  getCompletedExamSubjects(@Param("examId") Long examId);
    
}