package com.ieng.ieng.global.exception;

public class NotLoggedInException extends RuntimeException {
    public NotLoggedInException(String message){
        super(message);
    }
}
