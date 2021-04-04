package com.webapp.oes.jwtauthentication.repository;

import com.webapp.oes.jwtauthentication.model.QuestionType;

import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionTypeRepository extends JpaRepository<QuestionType, Integer> {
    
}
