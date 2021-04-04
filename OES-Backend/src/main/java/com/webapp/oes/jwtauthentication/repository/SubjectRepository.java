package com.webapp.oes.jwtauthentication.repository;

import java.util.List;

import com.webapp.oes.jwtauthentication.model.Subject;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SubjectRepository extends JpaRepository<Subject, Integer> {

 @Query("SELECT s FROM Subject s WHERE s.department.id = :dep_id and  s.semester.id = :sem_id")
    List<Subject> findSubjects(@Param("dep_id") int dep_id, @Param("sem_id") int sem_id);

}
