package com.ieng.ieng.domain.member.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ieng.ieng.domain.member.entity.Member;
import lombok.Getter;

import java.util.Date;

@Getter
public class MemberRequestDto {
    @JsonProperty("username")
    private String email;
    private String nickname;
    @JsonProperty("birth_YMD")
    private Date memberYMD;
    private String provider;

    private String picturePath;
    private String password;
    private String refreshToken;

    public void updateRefreshToken(String refreshToken){
        this.refreshToken = refreshToken;
    }
    public Member toEntity(){
        return Member.builder()
                .email(this.email)
                .nickname(this.nickname)
                .memberYMD(this.memberYMD)
                .provider(this.provider)
                .picturePath(this.picturePath)
                .password(this.password)
                .refreshToken(this.refreshToken)
                .build();
    }

}
