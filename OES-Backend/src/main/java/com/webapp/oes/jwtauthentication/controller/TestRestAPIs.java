package com.webapp.oes.jwtauthentication.controller;

import java.util.List;

import javax.validation.Valid;

import com.webapp.oes.jwtauthentication.message.response.ApiResponse;
import com.webapp.oes.jwtauthentication.model.Department;
import com.webapp.oes.jwtauthentication.model.Exam;
import com.webapp.oes.jwtauthentication.model.ExamSubject;
import com.webapp.oes.jwtauthentication.model.Question;
import com.webapp.oes.jwtauthentication.model.QuestionDetails;
import com.webapp.oes.jwtauthentication.model.QuestionType;
import com.webapp.oes.jwtauthentication.model.Semester;
import com.webapp.oes.jwtauthentication.model.Subject;
import com.webapp.oes.jwtauthentication.model.Teacher;
import com.webapp.oes.jwtauthentication.model.Year;
import com.webapp.oes.jwtauthentication.repository.DepartmentRepository;
import com.webapp.oes.jwtauthentication.repository.ExamRepository;
import com.webapp.oes.jwtauthentication.repository.QuestionDetailsRepository;
import com.webapp.oes.jwtauthentication.repository.QuestionRepository;
import com.webapp.oes.jwtauthentication.repository.QuestionTypeRepository;
import com.webapp.oes.jwtauthentication.repository.SemesterRepository;
import com.webapp.oes.jwtauthentication.repository.SubjectRepository;
import com.webapp.oes.jwtauthentication.repository.TeacherRepository;
import com.webapp.oes.jwtauthentication.repository.YearRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController

public class TestRestAPIs {

	@Autowired
	public ExamRepository examRepository;

	@Autowired
	public QuestionRepository qRepository;

	@Autowired
	public DepartmentRepository dRepository;

	@Autowired
	public TeacherRepository tRepository;

	@Autowired
	public YearRepository yRepository;

	@Autowired
	public QuestionTypeRepository qtRepository;

	@Autowired
	public SemesterRepository sRepository;

	@Autowired
	public QuestionDetailsRepository qdRepository;

	@Autowired
    public SubjectRepository suRepository;

	@GetMapping("/api/test/user")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public String userAccess() {
		return ">>> User Contents!";
	}

	@GetMapping("/api/test/pm")
	@PreAuthorize("hasRole('PM') or hasRole('ADMIN')")
	public String projectManagementAccess() {
		return ">>> Project Management Board";
	}

	@GetMapping("/api/test/admin")
	@PreAuthorize("hasRole('ADMIN')")
	public String adminAccess() {
		return ">>> Admin Contents";
	}

	@PostMapping("/api/exam")
	public ResponseEntity<?> addExam(@RequestBody Exam exam) {
		
		Long id = examRepository.save(exam).getId();

		if (id != null) {

			var ex = examRepository.findById(id).get();

        	var dep_id = dRepository.findByName(ex.getDepartment()).getId();

			var sem_id = sRepository.findByName(ex.getSemester()).getId();

			var sList = suRepository.findSubjects(dep_id, sem_id);

			for (Subject subject: sList) {
                ex.getsDates().add(new ExamSubject(ex, subject, null, null));
			}

			return ResponseEntity.ok(new ApiResponse(true, "Exam Added.", ex));
		}

		return new ResponseEntity<>(new ApiResponse(false, "Exam not added.", null), HttpStatus.BAD_REQUEST);
	}

	@GetMapping("/api/exam")
	public ResponseEntity<?> examList() {
		List<Exam> ex = examRepository.findAll();

		return new ResponseEntity<>(new ApiResponse(true, "All exam list.", ex), HttpStatus.OK);
	}

	

	@PostMapping("/api/test")
	public QuestionDetails test(@Valid @RequestBody QuestionDetails question) {

		return qdRepository.save(question);

		// var qd = qdRepository.findQuestionDetails(question.getQuestionDetails());

		// if(qd !=null ) {

		// 	Question q = new Question(question.getTitle(), question.getOp(), question.getAnswer(), question.getSubjectUnit(), question.getPoints());

		// 	qdRepository.findById(qd.getId()).get().getQuestions().add(q);
			
		// 	return new  ResponseEntity<>(new ApiResponse(true, "Question added to already existed details.", qdRepository.save(qd)), HttpStatus.OK);
		// }
		
		// return new ResponseEntity<>(new ApiResponse(true, "Question added with new details..", qRepository.save(question)), HttpStatus.OK);
	}

	@GetMapping("/api/question")
	public ResponseEntity<?> getQuestions() {
		List<Question> q = qRepository.findAll();

		return new ResponseEntity<>(new ApiResponse(true, "Question list.", q), HttpStatus.OK); 
	}

	@PostMapping("/api/department")
	public ResponseEntity<?> addDepartment(@Valid @RequestBody Department department) {
		Department d = dRepository.save(department);
		if (d != null) {
			return ResponseEntity.ok(new ApiResponse(true, "Department Added.", d));
		}

		return new ResponseEntity<>(new ApiResponse(false, "Department not added.", null), HttpStatus.BAD_REQUEST);
	}

	@GetMapping("/api/department")
	public ResponseEntity<?> getDepartments() {
		List<Department> d = dRepository.findAll();

		return new ResponseEntity<>(new ApiResponse(true, "All department list.", d), HttpStatus.OK);
	}

	@PostMapping("/api/teacher")
	public ResponseEntity<?> addTeacher(@Valid @RequestBody Teacher teacher) {
		Teacher t = tRepository.save(teacher);
		if (t != null) {
			return ResponseEntity.ok(new ApiResponse(true, "Teacher Added.", t));
		}

		return new ResponseEntity<>(new ApiResponse(false, "Teacher not added.", null), HttpStatus.BAD_REQUEST);
	}

	@GetMapping("/api/teacher")
	public ResponseEntity<?> getTeachers() {
		List<Teacher> t = tRepository.findAll();

		return new ResponseEntity<>(new ApiResponse(true, "All Teacher list.", t), HttpStatus.OK);
	}

	@PostMapping("/api/year")
	public ResponseEntity<?> addYear(@Valid @RequestBody Year year) {
		Year y = yRepository.save(year);
		if (y != null) {
			return ResponseEntity.ok(new ApiResponse(true, "Year Added.", y));
		}

		return new ResponseEntity<>(new ApiResponse(false, "Year not added.", null), HttpStatus.BAD_REQUEST);
	}

	@GetMapping("/api/year")
	public ResponseEntity<?> getAllYear() {
		List<Year> y = yRepository.findAll();

		return new ResponseEntity<>(new ApiResponse(true, "All Year list.", y), HttpStatus.OK);
	}

	@PostMapping("/api/questionType")
	public ResponseEntity<?> addQuestionType(@Valid @RequestBody QuestionType type) {
		QuestionType qt = qtRepository.save(type);
		if (qt != null) {
			return ResponseEntity.ok(new ApiResponse(true, "Type Added.", qt));
		}

		return new ResponseEntity<>(new ApiResponse(false, "Type not added.", null), HttpStatus.BAD_REQUEST);
	}

	@GetMapping("/api/questionType")
	public ResponseEntity<?> getQuestionType() {
		List<QuestionType> qt = qtRepository.findAll();

		return new ResponseEntity<>(new ApiResponse(true, "All question type list.", qt), HttpStatus.OK);
	}

	@PostMapping("/api/semester")
	public ResponseEntity<?> addSemester(@Valid @RequestBody Semester semester) {
		Semester s = sRepository.save(semester);
		if (s != null) {
			return ResponseEntity.ok(new ApiResponse(true, "Semester Added.", s));
		}

		return new ResponseEntity<>(new ApiResponse(false, "Semester not added.", null), HttpStatus.BAD_REQUEST);
	}

	@GetMapping("/api/semester")
	public ResponseEntity<?> getAllSemester() {
		List<Semester> s = sRepository.findAll();

		return new ResponseEntity<>(new ApiResponse(true, "All Semester list.", s), HttpStatus.OK);
	}
	
}