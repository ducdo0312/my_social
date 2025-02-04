package com.zosh.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zosh.models.User;
import com.zosh.repository.UserRepository;

@Service
public class UserServiceImplementation implements UserService{
	
	@Autowired
	UserRepository userRepository;
	
	@Override
	public User registerUser(User user) throws Exception{
		User newUser= new User();
		newUser.setEmail(user.getEmail());
		newUser.setFirstName(user.getFirstName());
		newUser.setLastName(user.getLastName());
		newUser.setPassword(user.getPassword());
		newUser.setId(user.getId());
		
		if(userRepository.findById(user.getId()).isPresent()) {
			throw new Exception("User existed, user different Id please");
		}
		
		User saveUser = userRepository.save(newUser);
		
		return saveUser;
	}

	@Override
	public User findUserById(Integer userId) throws Exception {
		
		Optional<User> user= userRepository.findById(userId);
		
		if(user.isPresent()) {
			return user.get();
		}
		
		
		throw new Exception("User not exist with userid " + userId);
	}

	@Override
	public User findUserByEmail(String email) {
		User user = userRepository.findByEmail(email);
		return user;
	}

	@Override
	public User followUser(Integer userId1, Integer userId2) throws Exception {
		User user1 = findUserById(userId1);
		
		User user2 = findUserById(userId2);
		
		user2.getFollowers().add(user1.getId());
		user1.getFollowings().add(user2.getId());
		
		userRepository.save(user1);
		userRepository.save(user2);
		return user1;
	}

	@Override
	public User updateUser(User user, Integer userId) throws Exception {
		Optional<User> user1 = userRepository.findById(userId);
		
		if(user1.isEmpty()) {
			throw new Exception("User doesn't exist with id " + userId);
		}
			
		User oldUser = user1.get();
		
		if(user.getFirstName() != null) {
			oldUser.setFirstName(user.getFirstName());
		}
		if(user.getLastName() != null) {
			oldUser.setLastName(user.getLastName());
		}
		if(user.getEmail() != null) {
			oldUser.setEmail(user.getEmail());
		}
		if(user.getPassword() != null) {
			oldUser.setPassword(user.getPassword());
		} 
		if(user.getFollowers() != null) {
			oldUser.setFollowers(user.getFollowers());
		}
		if(user.getFollowings() != null) {
			oldUser.setFollowings(user.getFollowings());
		}
		
		User updatedUser = userRepository.save(oldUser);
		
		
		return updatedUser;
	}

	@Override
	public List<User> searchUser(String query) {
		// TODO Auto-generated method stub
		return userRepository.searchUser(query);
	}

}
