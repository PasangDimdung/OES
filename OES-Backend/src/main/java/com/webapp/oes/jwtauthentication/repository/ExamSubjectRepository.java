package com.webapp.oes.jwtauthentication.repository;

import com.webapp.oes.jwtauthentication.model.ExamSubject;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ExamSubjectRepository extends JpaRepository<ExamSubject, Long> {
    
}
