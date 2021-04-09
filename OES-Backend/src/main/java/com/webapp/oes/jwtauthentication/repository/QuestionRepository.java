package com.webapp.oes.jwtauthentication.repository;

import java.util.List;

import com.webapp.oes.jwtauthentication.message.request.QuestionFilter;
import com.webapp.oes.jwtauthentication.model.Question;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface QuestionRepository extends JpaRepository<Question, Integer> {
     
    @Query("from Question q " +
    "left join fetch q.questionDetails qd " + 
    "left join fetch q.subjectUnit sUnit " +
    "where qd.subject = :#{#qFilter. subject} AND qd.department = :#{#qFilter. department}  AND qd.semester = :#{#qFilter. semester} AND sUnit.unit = :#{#qFilter. unit}")
    List<Question> filterQuestions(@Param("qFilter") QuestionFilter qFilter);
    
}
