package com.webapp.oes.jwtauthentication.controller;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import com.webapp.oes.jwtauthentication.message.response.ApiResponse;
import com.webapp.oes.jwtauthentication.model.Department;
import com.webapp.oes.jwtauthentication.repository.DepartmentRepository;

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
public class DepartmentController {

    @Autowired
	public DepartmentRepository dRepository;
    
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

	@GetMapping("/api/department/{depId}")
	public ResponseEntity<?> getDepartments(@PathVariable("depId") int depId) {
		Optional<Department> d = dRepository.findById(depId);

		if(d != null) {
			return new ResponseEntity<>(new ApiResponse(true, "Department with id" + depId, d), HttpStatus.OK);
		}

		return new ResponseEntity<>(new ApiResponse(false, "Department with " +depId+ " not found.", null), HttpStatus.OK);
	}

    @PutMapping("/api/department/{depId}")
	public ResponseEntity<?> updateDepartment(@PathVariable("depId") int depId, @RequestBody Department department) {
		Optional<Department> d = dRepository.findById(depId);

        if(d != null) {
            var _d = d.get();
            _d.setName(department.getName());
        
            return new ResponseEntity<>(new ApiResponse(true, "Department name updated.",  dRepository.save(_d)), HttpStatus.OK);
        }

		return new ResponseEntity<>(new ApiResponse(false, "Department id not found.", null), HttpStatus.OK);
	}

    @DeleteMapping("/api/department/{depId}")
    public ResponseEntity<?> deleteDepartmentOfExam(@PathVariable int depId) {
        Optional<Department> d = dRepository.findById(depId);

        if(d != null) {
			try {
				dRepository.deleteById(depId);
				return new ResponseEntity<>(new ApiResponse(false, "Department name deleted.",  null), HttpStatus.OK);
			} catch (Exception e) {
				return new ResponseEntity<>(new ApiResponse(false, "Cannot delete",  null), HttpStatus.BAD_REQUEST);
			}
        }
		return new ResponseEntity<>(new ApiResponse(false, "Department id not found.", null), HttpStatus.NOT_FOUND);
    }





}
