package com.webapp.oes.jwtauthentication.controller;

import java.util.ArrayList;
import java.util.List;

import com.webapp.oes.jwtauthentication.message.response.ApiResponse;
import com.webapp.oes.jwtauthentication.message.response.ReportResponse;
import com.webapp.oes.jwtauthentication.model.AnswerSheet;
import com.webapp.oes.jwtauthentication.model.Report;
import com.webapp.oes.jwtauthentication.repository.AnswerSheetRepository;
import com.webapp.oes.jwtauthentication.repository.ReportRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController

public class ReportsController {
    
    @Autowired
    private AnswerSheetRepository aSheetRepository;

    @Autowired
    private ReportRepository reportRepository;

    
    
    @PostMapping("/api/exam/report")
    public ResponseEntity<?> generateReport(@RequestBody AnswerSheet answerSheet) {

        var a = aSheetRepository.findAnswer1(answerSheet);

        if(!a.isEmpty()) {
            var marks = 0;

            // check if report already generated

            var rep = reportRepository.findReport(answerSheet);

            if(rep != null) {

                return new ResponseEntity<>(new ApiResponse(true, "Report already exist.", rep), HttpStatus.OK);

            }
            
            for(AnswerSheet aSheet: a) {
                if(aSheet.getChoice() != null) {
                    if(aSheet.getChoice().getOp().equalsIgnoreCase(aSheet.getQuestion().getAnswer().getAnswer())) {
                        marks = marks + aSheet.getQuestion().getPoints();
                    }
                }
            }

            var reportObj = new Report(answerSheet.getStudent(), answerSheet.getSubject(), answerSheet.getExam(), marks);            

            return new ResponseEntity<>(new ApiResponse(true, "Reports Generated.", reportRepository.save(reportObj)), HttpStatus.OK);
        }

            return new ResponseEntity<>(new ApiResponse(false, "No reports", null), HttpStatus.OK);
    }

    @GetMapping("/api/exam/report")
    public ResponseEntity<?> getReport(@RequestBody AnswerSheet answerSheet) {

        var rep = reportRepository.getReport(answerSheet);

        List<ReportResponse> repList = new ArrayList<ReportResponse>();

        for(Report report : rep) {
            var id = report.getId();
            var name = report.getUser().getName();
            var registration_num = report.getUser().getsDetails().getRegistration_num();
            var exam = report.getExam().getName();
            var department = report.getExam().getDepartment();
            var semester = report.getExam().getSemester();
            var subjectName = report.getSubject().getName();
            var subjectFullMarks = report.getSubject().getFullMarks();
            var subjectPassMarks = report.getSubject().getPassMarks();
            var marksObtained = report.getMarks_obtained();

            ReportResponse reportObj = new ReportResponse(id, name, registration_num, exam, department, semester, subjectName, subjectFullMarks, subjectPassMarks, marksObtained);

            repList.add(reportObj);
        }

        return new ResponseEntity<>(new ApiResponse(true, "Reports of all subject.", repList), HttpStatus.OK);

    }
 
}
