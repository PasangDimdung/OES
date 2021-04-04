package com.webapp.oes.jwtauthentication.controller;

import java.io.UnsupportedEncodingException;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.webapp.oes.jwtauthentication.message.response.ResponseMessage;
import com.webapp.oes.jwtauthentication.model.User;
import com.webapp.oes.jwtauthentication.security.services.UserService;

import net.bytebuddy.utility.RandomString;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class ForgotPasswordController {
	
	@Autowired
	private JavaMailSender javaMailSender;
	
	@Autowired
	private UserService userService;

	@PostMapping("/forgot_password")
	public ResponseEntity<?> processForgotPassword(HttpServletRequest request, @RequestBody User user ) {
	    String email = user.getEmail();
	    String token = RandomString.make(60);
	     
	    try {
	        userService.updateResetPasswordToken(token, email);
	        //Need to use below code for production instead of "String resetPasswordLink = "http://localhost:4200/reset_password?token=" + token;"
	        //String resetPasswordLink = Utility.getSiteURL(request) + "/api/auth/reset_password?token=" + token;
	        String resetPasswordLink = "http://localhost:4200/#/reset_password?token=" + token;
	        sendEmail(email, resetPasswordLink);
	        return new ResponseEntity<>(new ResponseMessage("We have sent a reset password link to your email. Please check."), HttpStatus.OK);
	         
	    } catch (UsernameNotFoundException ex) {
	    	return new ResponseEntity<>(new ResponseMessage("User with email " + email + " not found."), HttpStatus.NOT_FOUND);
	    } catch (UnsupportedEncodingException | MessagingException e) {
	    	return new ResponseEntity<>(new ResponseMessage("Error while sending email"), HttpStatus.BAD_REQUEST);
	    }
	}
	
	public void sendEmail(String recipientEmail, String link)
	        throws MessagingException, UnsupportedEncodingException {
	    MimeMessage message = javaMailSender.createMimeMessage();              
	    MimeMessageHelper helper = new MimeMessageHelper(message);
	     
	    helper.setFrom("contact@oes.com", "OES Support");
	    helper.setTo(recipientEmail);
	     
	    String subject = "Here's the link to reset your password";
	     
	    String content = "<p>Hello,</p>"
	            + "<p>You have requested to reset your password.</p>"
	            + "<p>Click the link below to change your password:</p>"
	            + "<p><a href=\"" + link + "\">Change my password</a></p>"
	            + "<br>"
	            + "<p>Ignore this email if you do remember your password, "
	            + "or you have not made the request.</p>";
	     
	    helper.setSubject(subject);
	     
	    helper.setText(content, true);
	     
	    javaMailSender.send(message);
	}

	
	@PostMapping("/reset_password")
	public ResponseEntity<?> processResetPassword(@RequestBody User user) {
		String token = user.getResetPasswordToken();
	    String password = user.getPassword();
	     
	    User _user = userService.getByResetPasswordToken(token);
	     
	    if (_user == null) {
	    	return new ResponseEntity<>(new ResponseMessage("Invalid Token"), HttpStatus.BAD_REQUEST);
	        
	    } else {   
	        userService.updatePassword(_user, password);
	        return new ResponseEntity<>(new ResponseMessage("You have successfully changed your password."), HttpStatus.OK);
	      
	    }
	     

	}
	
	
	
	
}
