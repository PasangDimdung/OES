package com.webapp.oes.jwtauthentication.controller;

import java.util.Map;
import java.util.Optional;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.webapp.oes.jwtauthentication.message.response.ResponseMessage;
import com.webapp.oes.jwtauthentication.model.User;
import com.webapp.oes.jwtauthentication.repository.UserRepository;
import com.webapp.oes.jwtauthentication.security.services.UserService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController

public class ChangePasswordController {
	
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private UserService userService;
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	

	@PostMapping("/api/change_password")
	public ResponseEntity<?> processChangePassword(HttpServletRequest request, @RequestBody Map<String, Object> password ) throws ServletException{
	String oldPassword = password.get("oldPassword").toString();
	String newPassword = password.get("newPassword").toString();
	Optional<User> _user = userRepository.findByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
	
	if(oldPassword.equals(newPassword)) {
		return new ResponseEntity<>(new ResponseMessage("Your new password must be different than the old one."),HttpStatus.BAD_REQUEST);
	}
	if(!passwordEncoder.matches(oldPassword, _user.get().getPassword())){
		return new ResponseEntity<>(new ResponseMessage("Your old passsword is incorrect."),HttpStatus.BAD_REQUEST);
	}else {
		userService.updatePassword(_user.get(), newPassword);
		request.logout();
		return new ResponseEntity<>(new ResponseMessage("You have changed your password successfully. Please login again."),HttpStatus.BAD_REQUEST);
		
	}
	}
}
