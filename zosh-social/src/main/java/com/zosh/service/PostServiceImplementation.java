package com.zosh.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zosh.models.Post;
import com.zosh.models.User;
import com.zosh.repository.PostReposity;
import com.zosh.repository.UserRepository;

@Service
public class PostServiceImplementation implements PostService{

	@Autowired
	PostReposity postReposity; 
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	UserService userService;
	
	@Override
	public Post createNewPost(Post post, Integer userId) throws Exception {
		
		User user = userService.findUserById(userId);
		
		Post newPost = new Post();
		newPost.setCaption(post.getCaption());
		newPost.setImage(post.getImage());
		newPost.setCreateAt(LocalDateTime.now());
		newPost.setVideo(post.getVideo());
		newPost.setUser(user);
		return postReposity.save(newPost);
	}

	@Override
	public String deletePost(Integer postId, Integer userId) throws Exception {
		Post post = findPostById(postId);
		User user = userService.findUserById(userId);
		
		if(post.getUser().getId() != user.getId()) {
			throw new Exception("you can't delete anothor users post");
		}
        List<User> users = userRepository.findAll();
        for (User u : users) {
            if (u.getSavedPost().contains(post)) {
                u.getSavedPost().remove(post);
                userRepository.save(u);
            }
        }
		postReposity.delete(post);
		return "Post deleted successfully";
	}

	@Override
	public List<Post> findPostByUserId(Integer userId) {
		
		return postReposity.findPostByUserId(userId);
	}

	@Override
	public Post findPostById(Integer postId) throws Exception{
		Optional<Post> opt = postReposity.findById(postId);
		if(opt.isEmpty()) {
			throw new Exception("Post not found with id " + postId);
		}
		
		return opt.get();
	}

	@Override
	public List<Post> findAllPost() {
		
		return postReposity.findAll();
	}

	@Override
	public Post savedPost(Integer postId, Integer userId) throws Exception {
		Post post = findPostById(postId);
		User user = userService.findUserById(userId);
		
		if(user.getSavedPost().contains(post)) {
			user.getSavedPost().remove(post);
		}
		else {
			user.getSavedPost().add(post);
		}
		userRepository.save(user);
		return post;
	}

	@Override
	public Post likePost(Integer postId, Integer userId) throws Exception {
		Post post = findPostById(postId);
		User user = userService.findUserById(userId);
		
		if(post.getLiked().contains(user)) {
			post.getLiked().remove(user);
		}else {
			post.getLiked().add(user);
		}
		
		
		return postReposity.save(post);
	}

}
