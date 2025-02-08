package com.zosh.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zosh.models.Reels;
import com.zosh.models.Story;
import com.zosh.models.User;
import com.zosh.repository.StoryRepository;

@Service
public class StoryServiceImplementation implements StoryService{

	@Autowired
	private StoryRepository storyRepository;
	
	@Autowired
	private UserService userService;
	
	@Override
	public Story createStory(Story story, User user) {
		
		Story createStory = new Story();
		
		createStory.setCaptions(story.getCaptions());
		createStory.setUser(user);
		createStory.setImage(story.getImage());
		createStory.setTimestamp(LocalDateTime.now());
		
		return storyRepository.save(createStory);
	}

	@Override
	public List<Story> findStoryByUserId(Integer userId) throws Exception {
		User user = userService.findUserById(userId);
		
		
		
		return storyRepository.findByUserId(userId);
	}

}
