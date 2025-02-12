package com.zosh.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zosh.models.Chat;
import com.zosh.models.Message;
import com.zosh.models.User;
import com.zosh.repository.ChatRepository;
import com.zosh.repository.MessageRepository;

@Service
public class MessageServiceImplementation implements MessageService {

	@Autowired
	private MessageRepository messageRepository;
	
	@Autowired
	private ChatService chatService;
	
	@Autowired
	private ChatRepository chatRepository;
	
	@Override
	public Message createMessage(User user, Integer chatId, Message req) throws Exception {
		
		Chat chat = chatService.findChatById(chatId);
		Message message = new Message();
		
		
		
		message.setChat(chat);
		message.setContent(req.getContent());
		message.setUser(user);
		message.setImage(req.getImage());
		message.setTimestamp(LocalDateTime.now());
		
		chat.getMessages().add(message);
		chatRepository.save(chat);
		return messageRepository.save(message);
	}

	@Override
	public List<Message> findChatsMessages(Integer chatId) throws Exception {
		Chat chat = chatService.findChatById(chatId);
		return messageRepository.findByChatId(chatId);
	}

}
