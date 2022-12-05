package com.ieng.ieng.global.s3;

import org.springframework.web.multipart.MultipartFile;

public interface S3UploaderService {
    public void uploadPicture(MultipartFile multipartFile, String fileName);
}
