package com.webapp.oes.jwtauthentication.repository;

import java.util.List;

import com.webapp.oes.jwtauthentication.model.Exam;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ExamRepository extends JpaRepository<Exam, Long>{

    @Query("SELECT e FROM Exam e WHERE e.semester = :semester and e.department = :department and e.academic_year = :academic_year and e.status != 'completed'")
    List<Exam> findExams(@Param("semester") String semester, @Param("department") String department,  @Param("academic_year") String academic_year);

    List<Exam> findByDepartment(String department);

    @Query("SELECT e FROM Exam e WHERE e.semester = :semester and e.department = :department")
    List<Exam> reportOfExams(@Param("semester") String semester, @Param("department") String department);

    
}
