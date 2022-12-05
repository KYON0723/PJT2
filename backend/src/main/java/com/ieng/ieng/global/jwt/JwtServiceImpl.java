package com.ieng.ieng.global.jwt;

import com.ieng.ieng.domain.member.entity.Member;
import com.ieng.ieng.domain.member.repository.MemberRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class JwtServiceImpl implements JwtService{

    @Value("${jwt.secret}")
    private String SECRET_KEY;
    @Value("${jwt.access.subject}")
    private String ACCESS_TOKEN_SUBJECT;
    @Value("${jwt.refresh.subject}")
    private String REFRESH_TOKEN_SUBJECT;

    private final MemberRepository memberRepository;

    @Override
    public String createAccessToken(String email) {
        Date now = new Date();

        return Jwts.builder()
                .setHeaderParam("typ","JWT")
                .setIssuer("Hans")
                .setSubject(ACCESS_TOKEN_SUBJECT)
                .setExpiration(new Date(now.getTime() + 1000 * 60L * 60L))
                .claim("email",email)
                .signWith(SignatureAlgorithm.HS256,SECRET_KEY.getBytes())
                .compact();
    }

    @Override
    public String createRefreshToken() {
        Date now = new Date();

        return Jwts.builder()
                .setHeaderParam("typ","JWT")
                .setIssuer("Hans")
                .setSubject(REFRESH_TOKEN_SUBJECT)
                .setExpiration(new Date(now.getTime() + 1000L * 60L * 60L * 24L * 30L * 3L ))
                .signWith(SignatureAlgorithm.HS256,SECRET_KEY.getBytes())
                .compact();
    }

    @Override
    public boolean validateToken(String accessToken){
        Jwts.parser().setSigningKey(SECRET_KEY.getBytes()).parseClaimsJws(accessToken);
        return true;
    }

    @Override
    public String getEmailFromPayload(String accessToken){
        return Jwts.parser().setSigningKey(SECRET_KEY.getBytes()).parseClaimsJws(accessToken).getBody().get("email",String.class);
    }

    @Override
    public boolean compareRefreshToken(String refreshToken){
        Member member = memberRepository.findByRefreshToken(refreshToken).orElseThrow(() -> new NoSuchElementException("존재하는 회원정보가 없음."));
        String refreshTokenInDBMS = member.getRefreshToken();

        return true;
        /*
        if(refreshToken.equals(refreshTokenInDBMS)){
            return true;
        }
        throw new NoMatchRefreshTokenException("Refresh Token이 일치하지 않습니다.");*/
    }

}
