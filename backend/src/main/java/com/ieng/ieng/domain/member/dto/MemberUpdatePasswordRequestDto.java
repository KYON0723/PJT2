package com.ieng.ieng.domain.member.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.ieng.ieng.domain.member.entity.Member;
import lombok.Getter;

import java.util.Date;

@Getter
public class MemberUpdatePasswordRequestDto {

    @JsonProperty("cur_password")
    private String curPassword;
    @JsonProperty("new_password")
    private String newPassword;


    public Member toEntity(){
        return Member.builder()
                .password(curPassword)
                .build();
    }
}
