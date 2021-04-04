package com.webapp.oes.jwtauthentication.repository;

import com.webapp.oes.jwtauthentication.model.Question;

import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository extends JpaRepository<Question, Integer> {
    
}
