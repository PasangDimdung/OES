package com.webapp.oes.jwtauthentication.repository;

import java.util.List;

import com.webapp.oes.jwtauthentication.model.AnswerSheet;
import com.webapp.oes.jwtauthentication.model.Report;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ReportRepository extends JpaRepository<Report, Integer > {

    @Query("Select r FROM Report r WHERE r. user . id = :#{#report. student . id} AND r. subject . id = :#{#report. subject . id} AND r. exam . id = :#{#report. exam . id} ")
    Report findReport(@Param("report") AnswerSheet report);

    @Query("Select r FROM Report r WHERE r. user . id = :#{#report. student . id} AND r. exam . id = :#{#report. exam . id} ")
    List<Report> getReport(@Param("report") AnswerSheet report);
    
}
