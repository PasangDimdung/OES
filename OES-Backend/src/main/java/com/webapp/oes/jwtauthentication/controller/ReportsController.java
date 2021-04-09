package com.webapp.oes.jwtauthentication.controller;

import com.webapp.oes.jwtauthentication.message.response.ApiResponse;
import com.webapp.oes.jwtauthentication.model.AnswerSheet;
import com.webapp.oes.jwtauthentication.repository.AnswerSheetRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController

public class ReportsController {
    
    @Autowired
    private AnswerSheetRepository aSheetRepository;

    
    
    @PostMapping("/api/exam/report")
    public ResponseEntity<?> generateReport(@RequestBody AnswerSheet answerSheet) {

        var a = aSheetRepository.findAnswer1(answerSheet);

        if(!a.isEmpty()) {
            var marks = 0;
            
            for(AnswerSheet aSheet: a) {
                if(aSheet.getChoice() != null) {
                    if(aSheet.getChoice().getOp().equalsIgnoreCase(aSheet.getQuestion().getAnswer().getAnswer())) {
                        marks = marks + aSheet.getQuestion().getPoints();
                    }
                }
            }

            return new ResponseEntity<>(new ApiResponse(true, "Reports Generated.", marks), HttpStatus.OK);
        }

            return new ResponseEntity<>(new ApiResponse(true, "No reports", null), HttpStatus.OK);
    }
}
