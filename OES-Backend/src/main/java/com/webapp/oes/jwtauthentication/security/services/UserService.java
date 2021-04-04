package com.webapp.oes.jwtauthentication.security.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.webapp.oes.jwtauthentication.model.User;
import com.webapp.oes.jwtauthentication.repository.UserRepository;

//Forgot Password
@Service
@Transactional
public class UserService {

	@Autowired
	private UserRepository userRepository;
	
	 public void updateResetPasswordToken(String token, String email) throws UsernameNotFoundException {
	        User user = userRepository.findByEmail(email);
	        if (user != null) {
	            user.setResetPasswordToken(token);
	            userRepository.save(user);
	        } else {
	            throw new UsernameNotFoundException("Could not find any user with the email " + email);
	        }
	    }
	     
	    public User getByResetPasswordToken(String token) {
	        return userRepository.findByResetPasswordToken(token);
	    }
	     
	    public void updatePassword(User user, String newPassword) {
	        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
	        String encodedPassword = passwordEncoder.encode(newPassword);
	        user.setPassword(encodedPassword);
	         
	        user.setResetPasswordToken(null);
	        userRepository.save(user);
	    }
}
