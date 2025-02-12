package com.zosh.request;

public class CreateChatRequest {
	
	private Integer userId2;
	
	public CreateChatRequest() {
		// TODO Auto-generated constructor stub
	}

	public CreateChatRequest(Integer userId2) {
		super();
		this.userId2 = userId2;
	}

	public Integer getUserId2() {
		return userId2;
	}

	public void setUserId2(Integer userId2) {
		this.userId2 = userId2;
	}

	
}
