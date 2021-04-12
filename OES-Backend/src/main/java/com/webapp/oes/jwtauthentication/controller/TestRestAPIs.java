package com.webapp.oes.jwtauthentication.controller;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import com.webapp.oes.jwtauthentication.message.response.ApiResponse;
import com.webapp.oes.jwtauthentication.model.AcademicYear;
import com.webapp.oes.jwtauthentication.model.QuestionType;
import com.webapp.oes.jwtauthentication.model.Year;
import com.webapp.oes.jwtauthentication.repository.AcademicYearRepository;
import com.webapp.oes.jwtauthentication.repository.ExamRepository;
import com.webapp.oes.jwtauthentication.repository.QuestionDetailsRepository;
import com.webapp.oes.jwtauthentication.repository.QuestionTypeRepository;
import com.webapp.oes.jwtauthentication.repository.SubjectRepository;
import com.webapp.oes.jwtauthentication.repository.TeacherRepository;
import com.webapp.oes.jwtauthentication.repository.YearRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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

public class TestRestAPIs {

	@Autowired
	public ExamRepository examRepository;

	@Autowired
	public TeacherRepository tRepository;

	@Autowired
	public YearRepository yRepository;

	@Autowired
	public QuestionTypeRepository qtRepository;

	@Autowired
	public QuestionDetailsRepository qdRepository;

	@Autowired
    public SubjectRepository suRepository;

	@Autowired
    public AcademicYearRepository aYearRepository;

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

	@PostMapping("/api/questionType") // add question type
	public ResponseEntity<?> addQuestionType(@Valid @RequestBody QuestionType type) {
		QuestionType qt = qtRepository.save(type);
		if (qt != null) {
			return ResponseEntity.ok(new ApiResponse(true, "Type Added.", qt));
		}

		return new ResponseEntity<>(new ApiResponse(false, "Type not added.", null), HttpStatus.BAD_REQUEST);
	}
 
	@GetMapping("/api/questionType") // get all question type
	public ResponseEntity<?> getQuestionType() {
		List<QuestionType> qt = qtRepository.findAll();

		return new ResponseEntity<>(new ApiResponse(true, "All question type list.", qt), HttpStatus.OK);
	}

	@GetMapping("/api/questionType/{typeId}") // get question type by id
	public ResponseEntity<?> getQuestionTypeById(@PathVariable int typeId) {
		Optional<QuestionType> qt = qtRepository.findById(typeId);

		if(qt != null) {
			return new ResponseEntity<>(new ApiResponse(true, "Question type with id "+typeId, qt), HttpStatus.OK);
		}

		return new ResponseEntity<>(new ApiResponse(false, "Question type with id "+typeId+ " not found.", qt), HttpStatus.OK);
	}

	@PutMapping("/api/questionType/{typeId}") // update question type
	public ResponseEntity<?> updateQuestionType(@PathVariable int typeId, @RequestBody QuestionType qType) {
		Optional<QuestionType> qt = qtRepository.findById(typeId);

		if(qt != null) {
			var _qt = qt.get();
			_qt.setName(qType.getName());

			return new ResponseEntity<>(new ApiResponse(true, "Question type upated.", qtRepository.save(_qt)), HttpStatus.OK);

		}

		return new ResponseEntity<>(new ApiResponse(false, "Question type id not found.", null), HttpStatus.OK);
	}

	@DeleteMapping("/api/questionType/{typeId}")
    public ResponseEntity<?> deleteDepartmentOfExam(@PathVariable int typeId) {
        Optional<QuestionType> qt = qtRepository.findById(typeId);

        if(qt != null) {

			qtRepository.deleteById(typeId);
			return new ResponseEntity<>(new ApiResponse(true, "Question type deleted.", null), HttpStatus.OK);

		}

		return new ResponseEntity<>(new ApiResponse(false, "Question type id not found.", null), HttpStatus.OK);
    }

	@PostMapping("/api/academic-year")
	public ResponseEntity<?> addAcademicYear(@RequestBody AcademicYear year) {
		AcademicYear y = aYearRepository.save(year);
		if (y != null) {
			return ResponseEntity.ok(new ApiResponse(true, "Academic year Added.", y));
		}

		return new ResponseEntity<>(new ApiResponse(false, "Academic year not added.", null), HttpStatus.BAD_REQUEST);
	}

	@GetMapping("/api/academic-year")
	public ResponseEntity<?> getAcademicYear() {
		List<AcademicYear> y = aYearRepository.findAll();
		if (y != null) {
			return ResponseEntity.ok(new ApiResponse(true, "Academic year List.", y));
		}

		return new ResponseEntity<>(new ApiResponse(true, "Academic year list empty.", null), HttpStatus.NO_CONTENT);
	}

	@GetMapping("/api/academic-year/{id}")
	public ResponseEntity<?> getAcademicYearById(@PathVariable int id) {
		Optional<AcademicYear> y = aYearRepository.findById(id);
		if (y != null) {
			return ResponseEntity.ok(new ApiResponse(true, "Academic year with id " + id, y));
		}

		return new ResponseEntity<>(new ApiResponse(false, "Academic year with id " + id+ "not found.", null), HttpStatus.NOT_FOUND);
	}

	@PutMapping("/api/academic-year/{id}") // update Academic year
	public ResponseEntity<?> updateAcademicYear(@PathVariable int id, @RequestBody QuestionType qType) {
		Optional<AcademicYear> qt = aYearRepository.findById(id);

		if(qt != null) {
			var _qt = qt.get();
			_qt.setName(qType.getName());

			return new ResponseEntity<>(new ApiResponse(true, "Academic year upated.", aYearRepository.save(_qt)), HttpStatus.OK);

		}

		return new ResponseEntity<>(new ApiResponse(false, "Academic year id not found.", null), HttpStatus.OK);
	}

	@DeleteMapping("/api/academic-year/{id}")
    public ResponseEntity<?> deleteAcademicYear(@PathVariable int id) {
        Optional<AcademicYear> qt = aYearRepository.findById(id);

        if(qt != null) {

			try {
				aYearRepository.deleteById(id);
				return new ResponseEntity<>(new ApiResponse(true, "Academic year deleted.", null), HttpStatus.OK);
			} catch (Exception e) {
				return new ResponseEntity<>(new ApiResponse(false, "cannot delete.", null), HttpStatus.BAD_REQUEST);
			}

		}

		return new ResponseEntity<>(new ApiResponse(false, "Academic year with " + id+" id not found.", null), HttpStatus.NOT_FOUND);
    }
	
}