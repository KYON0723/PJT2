package com.ieng.ieng.domain.member.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

import java.util.Date;

@Getter
public class MemberGoogleRequestDto {
    @JsonProperty("id_token")
    String idToken;

    private String nickname;

    @JsonProperty("birth_YMD")
    private Date memberYMD;

}
