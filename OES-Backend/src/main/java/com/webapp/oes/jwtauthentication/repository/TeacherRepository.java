package com.webapp.oes.jwtauthentication.repository;

import com.webapp.oes.jwtauthentication.model.Teacher;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TeacherRepository extends JpaRepository<Teacher, Integer> {
    
}
