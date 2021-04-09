package com.webapp.oes.jwtauthentication.controller;

import java.util.List;

import com.webapp.oes.jwtauthentication.message.request.QuestionFilter;
import com.webapp.oes.jwtauthentication.message.response.ApiResponse;
import com.webapp.oes.jwtauthentication.model.Question;
import com.webapp.oes.jwtauthentication.repository.QuestionRepository;

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
public class QuestionController {

    @Autowired
	public QuestionRepository qRepository;
    
    @GetMapping("/api/question")
	public ResponseEntity<?> getQuestions() {
		List<Question> q = qRepository.findAll();

		return new ResponseEntity<>(new ApiResponse(true, "Question list.", q), HttpStatus.OK); 
	}

    @PostMapping("/api/question/filter")
    public ResponseEntity<?> filterQuestions(@RequestBody QuestionFilter qFilter) {
        List<Question> q = qRepository.filterQuestions(qFilter);

        if(q != null) {

            return new ResponseEntity<>(new ApiResponse(true, "Question filter list.", q), HttpStatus.OK); 

        }

        return new ResponseEntity<>(new ApiResponse(false, "Questions not found.", null), HttpStatus.OK); 

    }
}
