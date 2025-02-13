package com.zoh.exceptions;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class GlobalExceptions {
	
	@ExceptionHandler(UserException.class)
	public ResponseEntity<ErrorDetails> UserExceptionHandler(
			UserException ue,
			WebRequest rq){
		
		ErrorDetails errorDetails = new ErrorDetails(ue.getMessage(), rq.getDescription(false), LocalDateTime.now());
		
		return new ResponseEntity<ErrorDetails>(errorDetails, HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(Exception.class)
	public ResponseEntity<ErrorDetails> otherExceptionHandler(
			Exception ue,
			WebRequest rq){
		
		ErrorDetails errorDetails = new ErrorDetails(ue.getMessage(), rq.getDescription(false), LocalDateTime.now());
		
		return new ResponseEntity<ErrorDetails>(errorDetails, HttpStatus.BAD_REQUEST);
	}
	
}
