package com.zosh.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.zosh.models.Comment;

public interface CommentReposity extends JpaRepository<Comment, Integer >{

}
