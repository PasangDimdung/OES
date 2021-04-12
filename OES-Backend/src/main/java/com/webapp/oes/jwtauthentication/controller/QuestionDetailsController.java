package com.webapp.oes.jwtauthentication.controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import javax.validation.Valid;

import com.webapp.oes.jwtauthentication.message.response.ApiResponse;
import com.webapp.oes.jwtauthentication.model.Question;
import com.webapp.oes.jwtauthentication.model.QuestionDetails;
import com.webapp.oes.jwtauthentication.model.QuestionPaper;
import com.webapp.oes.jwtauthentication.repository.QuestionDetailsRepository;
import com.webapp.oes.jwtauthentication.repository.QuestionPaperRepository;
import com.webapp.oes.jwtauthentication.repository.QuestionRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class QuestionDetailsController {

    @Autowired
    public QuestionDetailsRepository qDetailsRepository;

    @Autowired
    public QuestionRepository qRepository;

    @Autowired
    public QuestionPaperRepository qPaperRepository;

    @Autowired
	public QuestionDetailsRepository qdRepository;

    @PostMapping("/api/question")
	public ResponseEntity<?> addQuestion(@Valid @RequestBody Question question) {

		var qd = qdRepository.findQuestionDetails(question.getQuestionDetails());

		if(qd !=null ) {

			Question q = new Question(question.getTitle(), question.getOp(), question.getAnswer(), question.getSubjectUnit(), question.getPoints());

			qdRepository.findById(qd.getId()).get().getQuestions().add(q);
			
			return new  ResponseEntity<>(new ApiResponse(true, "Question added to already existed details.", qdRepository.save(qd)), HttpStatus.OK);
		}
		
		return new ResponseEntity<>(new ApiResponse(true, "Question added with new details..", qRepository.save(question)), HttpStatus.OK);
	}

    @PutMapping("/api/question/{qId}")
    public ResponseEntity<?> updateQuestionDetails(@RequestBody Question question, @PathVariable int qId) {
        var q = qRepository.findById(qId);

        if (q.isPresent()) {
            var _q = q.get();

            _q.setTitle(question.getTitle());
            _q.setAnswer(question.getAnswer());
            _q.setOp(question.getOp());
            _q.setQuestionDetails(question.getQuestionDetails());

            return new ResponseEntity<>(new ApiResponse(true, "Question Details updated", qRepository.save(_q)),
                    HttpStatus.OK);
        }

        return new ResponseEntity<>(new ApiResponse(true, "Question Details with id " + qId + "not found", null),
                HttpStatus.OK);
    }

    @PostMapping("api/generatePaper")

    public ResponseEntity<?> generatePaper(@RequestBody QuestionPaper paper) {


        var qd = qDetailsRepository.findQuestions(paper);

        List<Question> question = new ArrayList<Question>();

        for(QuestionDetails qDetails : qd) {
            question.addAll(qDetails.getQuestions());
        }

        Collections.shuffle(question);

        List<Question> lQuestion = new ArrayList<Question>();

        Integer qSize = 10;

        if(question.size() < qSize) {
            return new ResponseEntity<>(new ApiResponse(false, "Insufficient questions in database", null),
                    HttpStatus.OK);
        }

        // add shuffled question into new array list.
        for(int i=0; i<qSize; i++) {
            Question q = question.get(i);
            Integer count = 0;

            // check if particular unit questions is more than 3.
            if(lQuestion.isEmpty()) {
                lQuestion.add(q);

            } else {
                Integer u1 = q.getSubjectUnit().getUnit();

                // check if question from particular unit is more than needed.
                for(int j=0; j<lQuestion.size(); j++) {
                    Integer u2 = lQuestion.get(j).getSubjectUnit().getUnit();
                    if(u1 == u2) {
                        count++;
                    }
                }

                if(count < 3) {
                    lQuestion.add(q);
                }  else {
                    if(qSize < question.size()) {
                        qSize++;
                    }
                }    
            }
        }

        // check size of question
         if (lQuestion.size() == qSize) {

              // check if question paper already exists
              var qPaper = qPaperRepository.findQuestionPaper(paper);
                
                if(qPaper != null) {
                    return new ResponseEntity<>(new ApiResponse(false, "Question  paper already exists", qPaper),HttpStatus.OK);
                } 

                // save generated question
                for(Question question2: lQuestion) {

                    var qPaper1 = qPaperRepository.findQuestionPaper(paper);
                
                    if(qPaper1 != null) {
                        qRepository.findById(question2.getId()).get().getqPapers().add(qPaperRepository.findById(qPaper1.getId()).get());
                        qRepository.save(question2);
                    } else {

                       QuestionPaper qp = qPaperRepository.save(paper);

                       qRepository.findById(question2.getId()).get().getqPapers().add(qp);
                        qRepository.save(question2);
                    }
                }

                return new ResponseEntity<>(new ApiResponse(true, "Question generated of total "+ lQuestion.size(), lQuestion),
                    HttpStatus.OK);
        }

        return new ResponseEntity<>(new ApiResponse(false, "Question generated is less than required one. Add more questions with different unit", lQuestion),
                    HttpStatus.OK);

    }

}
