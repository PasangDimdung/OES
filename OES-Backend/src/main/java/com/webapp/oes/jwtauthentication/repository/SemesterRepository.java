package com.webapp.oes.jwtauthentication.repository;

import com.webapp.oes.jwtauthentication.model.Semester;

import org.springframework.data.jpa.repository.JpaRepository;

public interface SemesterRepository extends JpaRepository<Semester, Integer>{
    Semester findByName(String name);
}
