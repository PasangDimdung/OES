package com.webapp.oes.jwtauthentication.repository;

import com.webapp.oes.jwtauthentication.model.Year;

import org.springframework.data.jpa.repository.JpaRepository;

public interface YearRepository extends JpaRepository<Year, Integer> {
    
}
