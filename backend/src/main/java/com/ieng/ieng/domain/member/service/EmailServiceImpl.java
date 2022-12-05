package com.ieng.ieng.domain.member.service;

import java.io.UnsupportedEncodingException;
import java.time.Duration;
import java.util.Random;

import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMessage.RecipientType;

import com.ieng.ieng.domain.member.controller.MemberController;
import com.ieng.ieng.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    final static Logger logger = LogManager.getLogger(MemberController.class);

    private final MemberRepository memberRepository;

    private final JavaMailSender emailSender; // Bean 등록해둔 MailConfig 를 emailsender 라는 이름으로 autowired

    private final StringRedisTemplate redisTemplate;

    private String ePw; // 인증번호


    // 메일 중복 체크
    public boolean checkEmail(String email){
        return memberRepository.existsByEmail(email);
    }


    // 메일 내용 작성


    public MimeMessage createMessage(String email) throws MessagingException, UnsupportedEncodingException {


        MimeMessage message = emailSender.createMimeMessage();

        message.addRecipients(RecipientType.TO, email);// 보내는 대상
        message.setSubject("Ieng 회원가입 이메일 인증");// 제목

        String msgg = "";
        msgg += "<div style='margin:100px;'>";
        msgg += "<h1> 안녕하세요</h1>";
        msgg += "<h1> Ieng 입니다</h1>";
        msgg += "<br>";
        msgg += "<p>아래 코드를 회원가입 창으로 돌아가 입력해주세요<p>";
        msgg += "<br>";
        msgg += "<div align='center' style='border:1px solid black; font-family:verdana';>";
        msgg += "<h3 style='color:blue;'>회원가입 인증 코드입니다.</h3>";
        msgg += "<div style='font-size:130%'>";
        msgg += "CODE : <strong>";
        msgg += ePw + "</strong><div><br/> "; // 메일에 인증번호 넣기
        msgg += "</div>";
        message.setText(msgg, "utf-8", "html");// 내용, charset 타입, subtype
        // 보내는 사람의 이메일 주소, 보내는 사람 이름
        message.setFrom(new InternetAddress("iengmanager@naver.com", "Ieng_Admin"));// 보내는 사람

        return message;
    }

    // 랜덤 인증 코드 전송

    public String createKey() {
        StringBuffer key = new StringBuffer();
        Random rnd = new Random();

        for (int i = 0; i < 8; i++) { // 인증코드 8자리
            int index = rnd.nextInt(3); // 0~2 까지 랜덤, rnd 값에 따라서 아래 switch 문이 실행됨

            switch (index) {
                case 0:
                    key.append((char) ((int) (rnd.nextInt(26)) + 97));
                    // a~z (ex. 1+97=98 => (char)98 = 'b')
                    break;
                case 1:
                    key.append((char) ((int) (rnd.nextInt(26)) + 65));
                    // A~Z
                    break;
                case 2:
                    key.append((rnd.nextInt(10)));
                    // 0~9
                    break;
            }
        }

        return key.toString();
    }

    // 메일 발송
    // sendSimpleMessage 의 매개변수로 들어온 to 는 곧 이메일 주소가 되고,
    // MimeMessage 객체 안에 내가 전송할 메일의 내용을 담는다.
    // 그리고 bean 으로 등록해둔 javaMail 객체를 사용해서 이메일 send!!

    public void sendSimpleMessage(String email) throws Exception {

        ePw = createKey(); // 랜덤 인증번호 생성


        MimeMessage message = createMessage(email); // 메일 발송
        try {// 예외처리
            emailSender.send(message);
        } catch (MailException es) {
            es.printStackTrace();
            throw new IllegalArgumentException();
        }

        setDataExpire(ePw, email, 60 * 5L);


    }
    public String getData(String key) {
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        return valueOperations.get(key);
    }

    public void setData(String key, String value) {
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        valueOperations.set(key, value);
    }

// 유효 시간 동안 (key, value) 저장
    public void setDataExpire(String key, String value, long duration) {
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        Duration expireDuration = Duration.ofSeconds(duration);
        valueOperations.set(key, value, expireDuration);
    }

    public boolean confirmEmail(String email, String key){
         if (getData(key)==null) return false;
        else return true;
    }

}
