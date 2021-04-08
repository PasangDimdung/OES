package com.webapp.oes.jwtauthentication.repository;

import com.webapp.oes.jwtauthentication.model.QuestionPaper;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface QuestionPaperRepository extends JpaRepository<QuestionPaper, Integer> {
    @Query("select qp from QuestionPaper qp where qp.department = :#{#paper. department} and qp.subject = :#{#paper.subject} and qp.semester = :#{#paper.semester} and qp.year = :#{#paper.year} and qp.exam.id = :#{#paper. exam .id}")
    QuestionPaper findQuestionPaper(@Param("paper") QuestionPaper paper);
}
