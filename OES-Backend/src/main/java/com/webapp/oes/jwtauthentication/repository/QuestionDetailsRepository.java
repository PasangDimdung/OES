package com.webapp.oes.jwtauthentication.repository;


import java.util.List;

import com.webapp.oes.jwtauthentication.model.QuestionDetails;
import com.webapp.oes.jwtauthentication.model.QuestionPaper;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface QuestionDetailsRepository extends JpaRepository<QuestionDetails, Integer> {
    
    @Query("select qd from QuestionDetails qd where qd.department = :#{#req. department} and qd.year = :#{#req.year} and qd.semester = :#{#req.semester} and qd.academic_year = :#{#req.academic_year} and qd.subject = :#{#req.subject}")
    QuestionDetails findQuestionDetails(@Param("req") QuestionDetails req);

    @Query("select qd from QuestionDetails qd where qd.department = :#{#paper. department} and qd.subject = :#{#paper.subject} and qd.semester = :#{#paper.semester}")
    List<QuestionDetails> findQuestions(@Param("paper") QuestionPaper paper);



}
