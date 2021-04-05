package com.webapp.oes.jwtauthentication.controller;


import com.webapp.oes.jwtauthentication.message.response.ApiResponse;
import com.webapp.oes.jwtauthentication.repository.ExamSubjectRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class ExamSubjectController {
    
    @Autowired
    public ExamSubjectRepository eSubjectRepository;

    @GetMapping("/api/exam-subject/{examId}")
    public ResponseEntity<?> getExamSubjects(@PathVariable Long examId) {

       return new ResponseEntity<>(new ApiResponse(true, "list of exam subjects", eSubjectRepository.findSubject(examId)), HttpStatus.OK);
    }
}
