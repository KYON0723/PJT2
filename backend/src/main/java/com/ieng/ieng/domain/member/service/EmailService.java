package com.ieng.ieng.domain.member.service;



public interface EmailService {

   void sendSimpleMessage(String to) throws Exception;
    boolean checkEmail(String email);

    boolean confirmEmail(String email, String key);
}
