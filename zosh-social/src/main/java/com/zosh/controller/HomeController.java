package com.zosh.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

	@GetMapping
	public String homeControllerHandler() {
		return "abc";
	}
	@GetMapping("/home")
	public String homeControllerHandler2() {
		return "ducodve001010-";
	}
	
	
	
	//@DeleteMapping
	//@PutMapping
	//@PutMapping
}
