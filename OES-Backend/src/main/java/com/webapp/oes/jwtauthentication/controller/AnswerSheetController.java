package com.webapp.oes.jwtauthentication.controller;


import com.webapp.oes.jwtauthentication.message.response.ApiResponse;
import com.webapp.oes.jwtauthentication.model.AnswerSheet;
import com.webapp.oes.jwtauthentication.model.QuestionChoice;
import com.webapp.oes.jwtauthentication.repository.AnswerSheetRepository;
import com.webapp.oes.jwtauthentication.repository.QuestionChoiceRepository;

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
public class AnswerSheetController {

    @Autowired
    private AnswerSheetRepository aSheetRepository;

    @Autowired
    private QuestionChoiceRepository qChoice;
    
    @PostMapping("/api/exam/subject/answer")
    public ResponseEntity<?> submitAnswer(@RequestBody AnswerSheet answerSheet) {

       var a = aSheetRepository.findAnswer(answerSheet);
        
        if(a != null) {

            var aSheet = aSheetRepository.findById(a.getId()).get();

            var o = answerSheet.getChoice();

            var id = o.getId();

            QuestionChoice c = qChoice.findById(id).get();

            aSheet.setChoice(c);

            aSheetRepository.save(aSheet);

            return new ResponseEntity<>(new ApiResponse(true, "Answer updated.",  aSheet), HttpStatus.OK);
        }

        var num = answerSheet.getChoice().getId();

        if(num == 0) {
            answerSheet.setChoice(null);
            var aSheet = aSheetRepository.save(answerSheet);

            return new ResponseEntity<>(new ApiResponse(true, "Answer submitted.", aSheet), HttpStatus.OK);

        }

            var aSheet = aSheetRepository.save(answerSheet);

            return new ResponseEntity<>(new ApiResponse(true, "Answer submitted.", aSheet), HttpStatus.OK);
    }

    @GetMapping("/api/exam/subject/answer")
    public ResponseEntity<?> getAnsers() {
        return ResponseEntity.ok(aSheetRepository.findAll()); 
    }
}
