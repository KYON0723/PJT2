package com.ieng.ieng.global.jwt;

import com.fasterxml.jackson.core.JsonProcessingException;

public interface JwtService {
    String createAccessToken( String email);
    String createRefreshToken();
    boolean validateToken(String accessToken);
    String getEmailFromPayload(String accessToken) throws JsonProcessingException;
    boolean compareRefreshToken(String refreshToken);
}
