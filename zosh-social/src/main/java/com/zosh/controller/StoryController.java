package com.zosh.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.zosh.models.Story;
import com.zosh.models.User;
import com.zosh.repository.StoryRepository;
import com.zosh.service.StoryService;
import com.zosh.service.UserService;

@RestController
public class StoryController {

	@Autowired
	private StoryService storyService;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private StoryRepository storyRepository;
	
	@PostMapping("/api/story")
	public Story createStory(
			@RequestBody Story story, 
			@RequestHeader("Authorization") String jwt
			) {
		User reqUser = userService.findUserByJwt(jwt);
		Story createdStory = storyService.createStory(story, reqUser);
		
		return createdStory;
	}
	
	@GetMapping("/api/story/user/{userId}")
	public List<Story> findUsersStory(
			@RequestHeader("Authorization")String jwt,
			@PathVariable Integer userId ){
		User reqUser = userService.findUserByJwt(jwt);
		List<Story> foundStory = storyRepository.findByUserId(userId);
		return foundStory;
	}
	
}
