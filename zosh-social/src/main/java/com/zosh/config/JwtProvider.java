package com.zosh.config;

import java.util.Date;

import javax.crypto.SecretKey;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

public class JwtProvider {
//	private static SecretKey key = Keys.hmacShaKeyFor(JwtConstant.SECRET_KEY.getBytes());
	private static SecretKey key;

	static {
	    try {
	        key = Keys.hmacShaKeyFor(JwtConstant.SECRET_KEY.getBytes("UTF-8"));
	    } catch (Exception e) {
	        throw new RuntimeException("Failed to initialize SecretKey", e);
	    }
	}

	public static String generateToken(org.springframework.security.core.Authentication auth) {
		String jwt = Jwts.builder()
				.setIssuer("Codewithducdo")
				.setIssuedAt(new Date())
				.setExpiration(new Date(new Date().getTime() + 86400000))
				.claim("email", auth.getName())
				.signWith(key)
				.compact();
		return jwt;
	}
	
	public static String getEmailFromJwtToken(String jwt) {
		
		jwt = jwt.substring(7);
		
		Claims claims = Jwts.parser().setSigningKey(key).build()
		.parseClaimsJws(jwt).getBody();
		
		String email = String.valueOf(claims.get("email"));
		return email;
	}
}