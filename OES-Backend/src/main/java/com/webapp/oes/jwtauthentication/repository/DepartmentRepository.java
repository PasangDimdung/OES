package com.webapp.oes.jwtauthentication.repository;

import com.webapp.oes.jwtauthentication.model.Department;

import org.springframework.data.jpa.repository.JpaRepository;


public interface DepartmentRepository extends JpaRepository<Department, Integer>{

    Department findByName(String name);
}
