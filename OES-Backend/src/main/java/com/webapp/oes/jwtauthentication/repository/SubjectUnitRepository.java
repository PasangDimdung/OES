package com.webapp.oes.jwtauthentication.repository;

import com.webapp.oes.jwtauthentication.model.SubjectUnit;

import org.springframework.data.jpa.repository.JpaRepository;

public interface SubjectUnitRepository extends JpaRepository<SubjectUnit, Integer> {
    
}
