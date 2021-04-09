package com.webapp.oes.jwtauthentication.controller;

import java.util.List;
import java.util.Optional;

import com.webapp.oes.jwtauthentication.message.response.ApiResponse;
import com.webapp.oes.jwtauthentication.model.Department;
import com.webapp.oes.jwtauthentication.model.Semester;
import com.webapp.oes.jwtauthentication.model.Subject;
import com.webapp.oes.jwtauthentication.model.SubjectUnit;
import com.webapp.oes.jwtauthentication.repository.DepartmentRepository;
import com.webapp.oes.jwtauthentication.repository.SemesterRepository;
import com.webapp.oes.jwtauthentication.repository.SubjectRepository;
import com.webapp.oes.jwtauthentication.repository.SubjectUnitRepository;

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
public class SubjectController {

    @Autowired
    public SubjectRepository sRepository;

    @Autowired
    public SemesterRepository semRepository;

    @Autowired
    public DepartmentRepository dRepository;

    @Autowired
    public SubjectUnitRepository sUnitRepository;

    @PostMapping("/api/subject")
	public ResponseEntity<?> addSubject(@RequestBody Subject subject) {
		
		Subject s = sRepository.save(subject);

		if (s != null) {
			return ResponseEntity.ok(new ApiResponse(true, "Subject Added.", s));
		}

		return new ResponseEntity<>(new ApiResponse(false, "Subject not added.", null), HttpStatus.BAD_REQUEST);
	}

	@GetMapping("/api/subject")
	public ResponseEntity<?> examList() {

		List<Subject> s = sRepository.findAll();

		return new ResponseEntity<>(new ApiResponse(true, "All subject list.", s), HttpStatus.OK);
    }
    
    @GetMapping("/api/subject/{id}")
    public ResponseEntity<?> getSubjectById(@PathVariable int id) {
        Optional<Subject> s = sRepository.findById(id);

        if(s.isPresent()) {
            return new ResponseEntity<>(new ApiResponse(true, "Subject with id "+id, s), HttpStatus.OK);
        }

        return new ResponseEntity<>(new ApiResponse(false, "Subject with id "+id+ " not found.", null), HttpStatus.NOT_FOUND);
    }

    @PutMapping("/api/subject/{id}")
    public ResponseEntity<?> updateSubjectById(@PathVariable int id, @RequestBody Subject subject) {
        Optional<Subject> s = sRepository.findById(id);

        if(s.isPresent()) {
            Subject _subject = s.get();
            _subject.setName(subject.getName());

            return new ResponseEntity<>(new ApiResponse(true, "Subject with id "+id+ " updated.", sRepository.save(_subject)), HttpStatus.OK);
        }

        return new ResponseEntity<>(new ApiResponse(false, "Subject with id "+id+ " not found.", null), HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("api/subject/{id}")
    public ResponseEntity<?> deleteSubjectById(@PathVariable int id) {

        try {
            sRepository.deleteById(id);
            return new ResponseEntity<>(new ApiResponse(true, "Subject with id "+id+ " deleted.", null), HttpStatus.OK);
        } catch(Exception e) {
            return new ResponseEntity<>(new ApiResponse(false, "Subject with id "+id+ " not found.", null), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("api/subject/{subjectId}/addSemester/{semesterId}")
    public ResponseEntity<?> addSemesterForSubject(@PathVariable int subjectId, @PathVariable int semesterId) {
        var sem = semRepository.findById(semesterId);
        Semester s = sem.get();
        s.getSubjects().add(sRepository.findById(subjectId).get());
        semRepository.save(s);
        return new ResponseEntity<>(new ApiResponse(true, "Semester added for subject.", s), HttpStatus.OK);
    }

    @DeleteMapping("api/subject/{subjectId}/removeSemester/{semesterId}")
    public ResponseEntity<?> removeSemesterForSubject(@PathVariable int subjectId, @PathVariable int semesterId) {
        var sem = semRepository.findById(semesterId);
        Semester s = sem.get();
        s.getSubjects().remove(sRepository.findById(subjectId).get());
        semRepository.save(s);
        return new ResponseEntity<>(new ApiResponse(true, "Semester removed for subject.", s), HttpStatus.OK);
    }

    @GetMapping("api/subject/{subjectId}/addDepartment/{departmentId}")
    public ResponseEntity<?> addDepartmentForSubject(@PathVariable int subjectId, @PathVariable int departmentId) {
        var department = dRepository.findById(departmentId);
        Department d = department.get();
        d.getSubjects().add(sRepository.findById(subjectId).get());
        dRepository.save(d);
        return new ResponseEntity<>(new ApiResponse(true, "Department added for subject.", d), HttpStatus.OK);
    }

    @DeleteMapping("api/subject/{subjectId}/removeDepartment/{departmentId}")
    public ResponseEntity<?> deleteDepartmentForSubject(@PathVariable int subjectId, @PathVariable int departmentId) {
        var department = dRepository.findById(departmentId);
        Department d = department.get();
        d.getSubjects().remove(sRepository.findById(subjectId).get());
        dRepository.save(d);
        return new ResponseEntity<>(new ApiResponse(true, "Subject removed from department.", d), HttpStatus.OK);
    }

    @PostMapping("api/subject/{subjectId}/addUnit")
    public ResponseEntity<?> addUnitForSubject(@PathVariable int subjectId, @RequestBody SubjectUnit sunit) {
        var subject = sRepository.findById(subjectId);
        Subject s = subject.get();
        s.getUnits().add(sunit);
        sRepository.save(s);
        return new ResponseEntity<>(new ApiResponse(true, "Unit added for subject.", s), HttpStatus.OK);
    }

    @PutMapping("api/subject/{subjectId}/editUnit/{unitId}")
    public ResponseEntity<?> editUnitForSubject(@PathVariable int subjectId, @PathVariable int unitId, @RequestBody SubjectUnit unit) {
        var sunit = sUnitRepository.findById(unitId);
        
        if(sunit.isPresent()) {
            SubjectUnit _sunit = sunit.get();

            _sunit.setName(unit.getName());
            _sunit.setUnit(unit.getUnit());

            sUnitRepository.save(_sunit);

            return new ResponseEntity<>(new ApiResponse(true, "Unit Updated for subject.", _sunit), HttpStatus.OK);
        }      
        return new ResponseEntity<>(new ApiResponse(false, "Unit with id " + unitId + "not found.", null), HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("api/subject/{subjectId}/deleteUnit/{unitId}")
    public ResponseEntity<?> deleteUnitForSubject(@PathVariable int subjectId, @PathVariable int unitId) {
        try {
            sUnitRepository.deleteById(unitId);
            return new ResponseEntity<>(new ApiResponse(true, "Semester with id "+unitId+ " deleted.", null), HttpStatus.OK);
        } catch(Exception e) {
            return new ResponseEntity<>(new ApiResponse(false, "Semester with id "+unitId+ " not found.", null), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/api/department/{deptId}/semester/{semId}/subjects")
    public ResponseEntity<?> getSubjectsOfDS(@PathVariable int deptId, @PathVariable int semId) {
        
        var subjects = sRepository.findSubjects(deptId, semId);

        if (subjects != null) {
            return new ResponseEntity<>(new ApiResponse(true, "Subject list", subjects), HttpStatus.OK);
        }

        return new ResponseEntity<>(new ApiResponse(false, "Subject list", null), HttpStatus.NO_CONTENT);
    }

    

}
