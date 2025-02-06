package com.zosh.service;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zosh.models.Comment;
import com.zosh.models.Post;
import com.zosh.models.User;
import com.zosh.repository.CommentReposity;
import com.zosh.repository.PostReposity;

import jakarta.persistence.PostRemove;

@Service
public class CommentServiceImplementation implements CommentService{

	
	@Autowired
	private PostService postService;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private CommentReposity commentReposity;
	
	@Autowired
	private PostReposity postRepository;
	
	@Override
	public Comment createCommment(
			Comment comment, 
			Integer postId,
			Integer userId) throws Exception {
		
		User user = userService.findUserById(userId);
		
		Post post = postService.findPostById(postId);
		
		comment.setUser(user);
		comment.setContent(comment.getContent());
		comment.setCreatedAt(LocalDateTime.now());
		
		Comment savedComment = commentReposity.save(comment);
		post.getComments().add(savedComment);
		return savedComment;
	}

	@Override
	public Comment findCommentById(Integer commentId) throws Exception{
		Optional<Comment> opt = commentReposity.findById(commentId);
		
		if(opt.isEmpty()) {
			throw new Exception("comment not exist");
		}
		
		return opt.get();
	}

	@Override
	public Comment likeComment(Integer CommentId, Integer userId) throws Exception {
		
		Comment comment = findCommentById(CommentId);
		User user = userService.findUserById(userId);
		
		if(!comment.getLiked().contains(user)) {
			comment.getLiked().add(user);
		}
		else {
			comment.getLiked().remove(user);
		}
		return commentReposity.save(comment);
	}

}
