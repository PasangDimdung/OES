package com.webapp.oes.jwtauthentication.repository;

import com.webapp.oes.jwtauthentication.model.AcademicYear;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AcademicYearRepository extends JpaRepository<AcademicYear, Integer>{
    
}
