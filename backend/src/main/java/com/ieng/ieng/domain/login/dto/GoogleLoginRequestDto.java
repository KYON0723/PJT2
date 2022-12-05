package com.ieng.ieng.domain.login.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class GoogleLoginRequestDto {
    @JsonProperty("id_token")
    private String idToken;
}
