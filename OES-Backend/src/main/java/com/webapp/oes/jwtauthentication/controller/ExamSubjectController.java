package com.webapp.oes.jwtauthentication.controller;


import com.webapp.oes.jwtauthentication.message.response.ApiResponse;
import com.webapp.oes.jwtauthentication.model.Exam;
import com.webapp.oes.jwtauthentication.repository.ExamRepository;
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
    public ExamRepository examRepository;
    
    @Autowired
    public ExamSubjectRepository eSubjectRepository;

    @GetMapping("/api/exam-subject/{examId}")
    public ResponseEntity<?> getExamSubjects(@PathVariable Long examId) {

       return new ResponseEntity<>(new ApiResponse(true, "list of exam subjects", eSubjectRepository.findSubject(examId)), HttpStatus.OK);
    }

    @GetMapping("/api/{examId}/exam-subject/completed")
    public ResponseEntity<?> getExamSubjectsByStatus(@PathVariable Long examId) {

        var exam_subject = eSubjectRepository.findSubject(examId);

        var completed = eSubjectRepository.getCompletedExamSubjects(examId);

        var n1 = exam_subject.size();

        var n2 = completed.size();

        if( n1 == n2) {
            Exam e = examRepository.findById(examId).get();

            e.setStatus("completed");

            return new ResponseEntity<>(new ApiResponse(true, "exam completed.", null), HttpStatus.OK);

        }

        return new ResponseEntity<>(new ApiResponse(true, "exam not completed.", null), HttpStatus.OK);

    }

}