package com.webapp.oes.jwtauthentication.controller;

import java.util.List;
import java.util.Optional;

import com.webapp.oes.jwtauthentication.message.request.SubjectDate;
import com.webapp.oes.jwtauthentication.message.response.ApiResponse;
import com.webapp.oes.jwtauthentication.model.Exam;
import com.webapp.oes.jwtauthentication.model.ExamSubject;
import com.webapp.oes.jwtauthentication.model.QuestionPaper;
import com.webapp.oes.jwtauthentication.model.Subject;
import com.webapp.oes.jwtauthentication.repository.DepartmentRepository;
import com.webapp.oes.jwtauthentication.repository.ExamRepository;
import com.webapp.oes.jwtauthentication.repository.ExamSubjectRepository;
import com.webapp.oes.jwtauthentication.repository.QuestionPaperRepository;
import com.webapp.oes.jwtauthentication.repository.SemesterRepository;
import com.webapp.oes.jwtauthentication.repository.SubjectRepository;
import com.webapp.oes.jwtauthentication.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class ExamController {

    @Autowired
    public ExamRepository examRepository;

    @Autowired
    public DepartmentRepository dRepository;

    @Autowired
    public UserRepository uRepository;

    @Autowired
    public SemesterRepository sRepository;

    @Autowired
    public SubjectRepository suRepository;

    @Autowired
    public QuestionPaperRepository qPaperRepository;

    @Autowired
    public ExamSubjectRepository eSubjectRepository;

    @GetMapping("/api/exam/{id}")
    public ResponseEntity<?> getExamById(@PathVariable Long id) {
        Optional<Exam> ex = examRepository.findById(id);

        if (ex.isPresent()) {
            return new ResponseEntity<>(new ApiResponse(true, "Exam with id " + id, ex), HttpStatus.OK);
        }

        return new ResponseEntity<>(new ApiResponse(false, "Exam with id " + id + " not found.", null),
                HttpStatus.NOT_FOUND);
    }

    @GetMapping("/api/exam/{examId}/department/{id}")
    public ResponseEntity<?> addDepartmentToExam(@PathVariable long examId, @PathVariable int id) {
        var ex = examRepository.findById(examId);
        Exam e = ex.get();
        e.getDepartments().add(dRepository.findById(id).get());
        examRepository.save(e);
        return new ResponseEntity<>(new ApiResponse(true, "Exam added for department", e), HttpStatus.OK);
    }

    @DeleteMapping("/api/exam/{examId}/department/{id}")
    public ResponseEntity<?> deleteDepartmentOfExam(@PathVariable long examId, @PathVariable int id) {
        var ex = examRepository.findById(examId);
        Exam e = ex.get();
        e.getDepartments().remove(dRepository.findById(id).get());
        examRepository.save(e);
        return new ResponseEntity<>(new ApiResponse(true, "Department removed for exam", e), HttpStatus.OK);
    }

    @PutMapping("/api/exam/{id}") // update exam name
    public ResponseEntity<?> updateExamById(@PathVariable Long id, @RequestBody Exam exam) {
        Optional<Exam> ex = examRepository.findById(id);

        if (ex.isPresent()) {
            Exam _exam = ex.get();
            _exam.setName(exam.getName());

            return new ResponseEntity<>(
                    new ApiResponse(true, "Exam with id " + id + " updated.", examRepository.save(_exam)),
                    HttpStatus.OK);
        }

        return new ResponseEntity<>(new ApiResponse(false, "Exam with id " + id + " not found.", null),
                HttpStatus.NOT_FOUND);
    }

    @PutMapping("/api/exam/{id}/status") // update status of exam after it has been finished.
    public ResponseEntity<?> updateExamStatus(@PathVariable Long id, @RequestBody Exam exam) {
        Optional<Exam> ex = examRepository.findById(id);

        if (ex.isPresent()) {
            Exam _exam = ex.get();
            _exam.setStatus(exam.getStatus());

            return new ResponseEntity<>(
                    new ApiResponse(true, "Exam with id " + id + " updated.", examRepository.save(_exam)),
                    HttpStatus.OK);
        }

        return new ResponseEntity<>(new ApiResponse(false, "Exam with id " + id + " not found.", null),
                HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("api/exam/{id}")
    public ResponseEntity<?> deleteExamById(@PathVariable Long id) {

        try {
            examRepository.deleteById(id);
            return new ResponseEntity<>(new ApiResponse(true, "Exam with id " + id + " deleted.", null), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new ApiResponse(false, "Exam with id " + id + " not found.", null),
                    HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("api/user/{id}/exams")
    public ResponseEntity<?> getExams(@PathVariable Long id) {
        var user = uRepository.findById(id).get();
        var uDetails = user.getsDetails();
        if (uDetails != null) {
            var exams = examRepository.findExams(uDetails.getSemester(), uDetails.getDepartment(),
                    uDetails.getAcademic_year());

            return new ResponseEntity<>(new ApiResponse(true, "Exam list", exams), HttpStatus.OK);
        }

        return new ResponseEntity<>(new ApiResponse(false, "User isnot a Student.", null), HttpStatus.OK);
    }

    @GetMapping("api/exam/{id}/subjects")
    public ResponseEntity<?> getExamSubject(@PathVariable long id) {
        var exam = examRepository.findById(id).get();

        var dep_id = dRepository.findByName(exam.getDepartment()).getId();

        var sem_id = sRepository.findByName(exam.getSemester()).getId();

        var su = suRepository.findSubjects(dep_id, sem_id);


       return new ResponseEntity<>(new ApiResponse(true, "Subject list", su), HttpStatus.OK);
    }

    @PostMapping("/api/exam/{id}/subjects") // add subjects as well dates of subject for a exam
	public ResponseEntity<?> addExamSubjects(@RequestBody List<SubjectDate> sDate, @PathVariable Long id) {

            var ex = examRepository.findById(id).get();

        	var dep_id = dRepository.findByName(ex.getDepartment()).getId();

			var sem_id = sRepository.findByName(ex.getSemester()).getId();

			var sList = suRepository.findSubjects(dep_id, sem_id);

			for (Subject subject: sList) {
                
                for(SubjectDate date: sDate) {
                    if(date.getName().equalsIgnoreCase(subject.getName())) {
                        ex.getsDates().add(new ExamSubject(ex, subject, date.getStarting_date(), date.getEnding_date()));
                    }
                }
                

			}

			return ResponseEntity.ok(new ApiResponse(true, "Exam subject dates added.", examRepository.save(ex)));
    }
    
    @PostMapping(value="api/exam/{examId}/subject/questions") // get questions of subject of a exam
    public ResponseEntity<?> getExamSUbjects(@PathVariable Long examId, @RequestBody QuestionPaper qPaper) {

        var q = qPaperRepository.findQuestionPaper(qPaper);
        
        if(q !=null) {
        return ResponseEntity.ok(new ApiResponse(true, "List of question of "+ qPaper.getSubject()+ " subject.", q));
        }

        return ResponseEntity.ok(new ApiResponse(false, qPaper.getSubject()+" subject question list not found.", null));

    }

    @PutMapping("/api/exam-subject/{id}/status") // update status of subject after it has been finished.
    public ResponseEntity<?> updateSubjectStatus(@PathVariable Long id, @RequestBody ExamSubject eSubject) {
        Optional<ExamSubject> es = eSubjectRepository.findById(id);

        if (es.isPresent()) {
            ExamSubject _examSubject = es.get();
            _examSubject.setStatus(eSubject.getStatus());

            return new ResponseEntity<>(
                    new ApiResponse(true, "Exam with id " + id + " updated.", eSubjectRepository.save(_examSubject)),
                    HttpStatus.OK);
        }

        return new ResponseEntity<>(new ApiResponse(false, "Exam with id " + id + " not found.", null),
                HttpStatus.NOT_FOUND);
    }
}
