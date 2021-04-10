package com.webapp.oes.jwtauthentication.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.webapp.oes.jwtauthentication.message.request.SignUpForm;
import com.webapp.oes.jwtauthentication.message.request.singnUpFormTeacher;
import com.webapp.oes.jwtauthentication.message.response.ApiResponse;
import com.webapp.oes.jwtauthentication.model.Role;
import com.webapp.oes.jwtauthentication.model.RoleName;
import com.webapp.oes.jwtauthentication.model.StudentDetails;
import com.webapp.oes.jwtauthentication.model.User;
import com.webapp.oes.jwtauthentication.repository.RoleRepository;
import com.webapp.oes.jwtauthentication.repository.UserRepository;
import com.webapp.oes.jwtauthentication.repository.StudentDetailsRepository;




import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController

public class UserController {

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    StudentDetailsRepository sDetailsRepository;
    
    @Autowired
	PasswordEncoder encoder;

    @PostMapping("api/addStudent")
    public StudentDetails addS(@RequestBody StudentDetails sDetails) {
        return sDetailsRepository.save(sDetails);
    }

    @PostMapping("api/student")
    public ResponseEntity<?> addStudent(@RequestBody SignUpForm signUpRequest) {

        // Creating user's account
		User user = new User(signUpRequest.getName(), signUpRequest.getUsername(), signUpRequest.getEmail(),
        encoder.encode(signUpRequest.getPassword()), signUpRequest.getsDetails());

        // var sDetails = signUpRequest.getsDetails();
        // sDetails.setUser(user);

        Set<String> strRoles = signUpRequest.getRole();
        Set<Role> roles = new HashSet<>();

        strRoles.forEach(role -> {
            switch (role) {
            case "admin":
                Role adminRole = roleRepository.findByName(RoleName.ROLE_ADMIN)
                        .orElseThrow(() -> new RuntimeException("Fail! -> Cause: User Role not find."));
                roles.add(adminRole);

                break;
            case "pm":
                Role pmRole = roleRepository.findByName(RoleName.ROLE_PM)
                        .orElseThrow(() -> new RuntimeException("Fail! -> Cause: User Role not find."));
                roles.add(pmRole);

                break;
            default:
                Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
                        .orElseThrow(() -> new RuntimeException("Fail! -> Cause: User Role not find."));
                roles.add(userRole);
            }
            });

        user.setRoles(roles);

        user.getsDetails().setUser(user);

        return new ResponseEntity<>(new ApiResponse(true, "User created", user), HttpStatus.OK);

    }

    @PostMapping("api/teacher")
    public User addteacher(@RequestBody singnUpFormTeacher signUpRequest) {

        // Creating user's account
		User user = new User(signUpRequest.getName(), signUpRequest.getUsername(), signUpRequest.getEmail(),
        encoder.encode(signUpRequest.getPassword()), signUpRequest.getTeacher());


        Set<String> strRoles = signUpRequest.getRole();
        Set<Role> roles = new HashSet<>();

        strRoles.forEach(role -> {
            switch (role) {
            case "admin":
                Role adminRole = roleRepository.findByName(RoleName.ROLE_ADMIN)
                        .orElseThrow(() -> new RuntimeException("Fail! -> Cause: User Role not find."));
                roles.add(adminRole);

                break;
            case "pm":
                Role pmRole = roleRepository.findByName(RoleName.ROLE_PM)
                        .orElseThrow(() -> new RuntimeException("Fail! -> Cause: User Role not find."));
                roles.add(pmRole);

                break;
            default:
                Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
                        .orElseThrow(() -> new RuntimeException("Fail! -> Cause: User Role not find."));
                roles.add(userRole);
            }
            });

        user.setRoles(roles);

        user.getTeacher().setUser(user);

        return userRepository.save(user);
    }


    @GetMapping("api/user")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

}
