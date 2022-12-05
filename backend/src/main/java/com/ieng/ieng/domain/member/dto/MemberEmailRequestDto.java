package com.ieng.ieng.domain.member.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;


@Getter
public class MemberEmailRequestDto {
    @JsonProperty("email")
    private String email;

    @JsonProperty("certification_number")
    private String certificationNumber;
}
