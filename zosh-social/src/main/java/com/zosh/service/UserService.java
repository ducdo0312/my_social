package com.zosh.service;

import java.util.List;

import com.zoh.exceptions.UserException;
import com.zosh.models.User;

public interface UserService {
	
	public User registerUser(User user) throws Exception;
	
	public User findUserById(Integer userId) throws UserException;
	
	public User findUserByEmail(String email);
	
	public User followUser(Integer usreId1, Integer userId2) throws Exception;
	
	public List<User> searchUser(String query);

	public User updateUser(User user, Integer userId) throws Exception;
	
	public User findUserByJwt(String jwt);
}
