package com.ieng.ieng.domain.login.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class LoginRequestDto {
    @JsonProperty("username")
    String email;
    String password;
}
