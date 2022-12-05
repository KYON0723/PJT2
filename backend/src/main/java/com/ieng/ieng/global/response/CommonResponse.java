package com.ieng.ieng.global.response;

import lombok.Getter;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Getter
public class CommonResponse<T>{
    private static final String SUCCESS = "SUCCESS";
    private static final String FAIL = "FAIL";
    private static final String ERROR = "ERROR";

    private String status;
    private String message;
    private T data;

    public CommonResponse(String status, String message, T data){
        this.status = status;
        this.message = message;
        this.data = data;
    }

    public static <T> CommonResponse createSuccess(String message, T data){
        return new CommonResponse(SUCCESS, message, data);
    }

    // Hibernate Validator에 의해 유효하지 않은 데이터로 인해 API 호출이 거부될때 반환
    public static CommonResponse createFail(BindingResult bindingResult){
        Map<String, String> errors = new HashMap<>();
        List<ObjectError> allErrors = bindingResult.getAllErrors();
        for (ObjectError error : allErrors) {
            if (error instanceof FieldError) {
                errors.put(((FieldError) error).getField(), error.getDefaultMessage());
            } else {
                errors.put( error.getObjectName(), error.getDefaultMessage());
            }
        }
        return new CommonResponse(FAIL, null, errors);
    }

    // 예외 발생으로 API 호출 실패시 반환
    public static CommonResponse createError(String message){
        return new CommonResponse(ERROR, message, null);
    }
}
