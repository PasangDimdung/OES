package com.webapp.oes.jwtauthentication.controller;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import com.webapp.oes.jwtauthentication.message.response.ApiResponse;
import com.webapp.oes.jwtauthentication.model.Semester;
import com.webapp.oes.jwtauthentication.model.Subject;
import com.webapp.oes.jwtauthentication.repository.DepartmentRepository;
import com.webapp.oes.jwtauthentication.repository.SemesterRepository;
import com.webapp.oes.jwtauthentication.repository.SubjectRepository;

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
public class SemesterController {
    @Autowired 
    public SemesterRepository semRepository;

    @Autowired 
    public DepartmentRepository dRepository;

    @Autowired 
    public SubjectRepository sRepository;

    @PostMapping("/api/semester")
	public ResponseEntity<?> addSemester(@Valid @RequestBody Semester semester) {
		Semester s = semRepository.save(semester);
		if (s != null) {
			return ResponseEntity.ok(new ApiResponse(true, "Semester Added.", s));
		}

		return new ResponseEntity<>(new ApiResponse(false, "Semester not added.", null), HttpStatus.BAD_REQUEST);
	}

	@GetMapping("/api/semester")
	public ResponseEntity<?> getAllSemester() {
		List<Semester> s = semRepository.findAll();

		return new ResponseEntity<>(new ApiResponse(true, "All Semester list.", s), HttpStatus.OK);
	}

    @GetMapping("/api/semester/{id}")
    public ResponseEntity<?> getSemesterById(@PathVariable int id) {
        Optional<Semester> sem = semRepository.findById(id);

        if(sem.isPresent()) {
            return new ResponseEntity<>(new ApiResponse(true, "Semester with id "+id, sem), HttpStatus.OK);
        }

        return new ResponseEntity<>(new ApiResponse(false, "Semester with id "+id+ " not found.", null), HttpStatus.NOT_FOUND);
    }

    @PutMapping("/api/semester/{id}")
    public ResponseEntity<?> updateSemesterById(@PathVariable int id, @RequestBody Semester semester) {
        Optional<Semester> sem = semRepository.findById(id);

        if(sem.isPresent()) {
            Semester _semester = sem.get();
            _semester.setName(semester.getName());

            return new ResponseEntity<>(new ApiResponse(true, "Semester with id "+id+ " updated.", semRepository.save(_semester)), HttpStatus.OK);
        }

        return new ResponseEntity<>(new ApiResponse(false, "Semester with id "+id+ " not found.", null), HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("api/semester/{id}")
    public ResponseEntity<?> deleteSemesterById(@PathVariable int id) {

        var sem = semRepository.findById(id);

        if(sem != null) {
            try {
                semRepository.deleteById(id);
                return new ResponseEntity<>(new ApiResponse(true, "Semester with id "+id+ " deleted.", null), HttpStatus.OK);
            } catch(Exception e) {
                return new ResponseEntity<>(new ApiResponse(false, "cannot delete.", null), HttpStatus.BAD_REQUEST);
            }
        }

        return new ResponseEntity<>(new ApiResponse(false, "Semester with id "+id+ " not found.", null), HttpStatus.NOT_FOUND);
        
    }

    @PostMapping("api/semester/{semesterId}/addSubject")
    public ResponseEntity<?> addSubjectForSemester(@RequestBody Subject subject, @PathVariable int semesterId) {
        var sem = semRepository.findById(semesterId);
        Semester s = sem.get();
        s.getSubjects().add(subject);

        semRepository.save(s);
        return new ResponseEntity<>(new ApiResponse(true, "Subject added for semester.", s), HttpStatus.OK);
    }

    @DeleteMapping("api/semester/{semesterId}/removeSubject/{subjectId}")
    public ResponseEntity<?> removeSubjectForSemester(@PathVariable int subjectId, @PathVariable int semesterId) {
        var subj = sRepository.findById(semesterId);

        if(subj != null) {
            try {
                sRepository.deleteById(subjectId);
                return new ResponseEntity<>(new ApiResponse(true, "Subject with id " + subjectId + " deleted.", null), HttpStatus.OK);
            } catch(Exception e) {
                return new ResponseEntity<>(new ApiResponse(false, "cannot delete.", null), HttpStatus.BAD_REQUEST);
            }
        }

        return new ResponseEntity<>(new ApiResponse(false, "Subject with id " + subjectId + " not found.", null), HttpStatus.NOT_FOUND);
    }

    
}
