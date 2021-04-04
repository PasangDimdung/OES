package com.webapp.oes.jwtauthentication.repository;

import com.webapp.oes.jwtauthentication.model.QuestionChoice;

import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionChoiceRepository extends JpaRepository<QuestionChoice, Integer> {
    
}
