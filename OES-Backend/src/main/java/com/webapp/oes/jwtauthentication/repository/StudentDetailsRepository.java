package com.webapp.oes.jwtauthentication.repository;

import com.webapp.oes.jwtauthentication.model.StudentDetails;

import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentDetailsRepository extends JpaRepository<StudentDetails, Integer> {
    
}
