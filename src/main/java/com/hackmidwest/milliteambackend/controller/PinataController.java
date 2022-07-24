package com.hackmidwest.milliteambackend.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.hackmidwest.milliteambackend.model.PinataUploadResponse;
import com.hackmidwest.milliteambackend.service.PinataService;

import reactor.core.publisher.Mono;

@RestController
public class PinataController {

  @Autowired
  PinataService service;

  @GetMapping(
    value = "/profile-pic/{id}",
    produces = MediaType.IMAGE_JPEG_VALUE
  )
  public Mono<byte[]> getImage(@PathVariable String id) throws IOException {
    return service.getPinataNFT(id);
  }
  
  @PostMapping("/profile-pic")
  public PinataUploadResponse uploadProfilePic(@RequestPart String id, @RequestPart MultipartFile image) throws Exception {
    return service.uploadPinataNFT(image, id);
  }
}
