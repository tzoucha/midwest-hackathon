package com.hackmidwest.milliteambackend.service;

import com.hackmidwest.milliteambackend.config.PinataConfig;
import com.hackmidwest.milliteambackend.model.PinataUploadResponse;
import com.hackmidwest.milliteambackend.repo.CustomerRepository;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.client.MultipartBodyBuilder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import com.hackmidwest.milliteambackend.config.PinataConfig;
import com.hackmidwest.milliteambackend.model.PinataUploadResponse;
import com.hackmidwest.milliteambackend.repo.AccountRepository;
import com.hackmidwest.milliteambackend.repo.CustomerRepository;

import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

@Service
public class PinataService {
  @Autowired
  PinataConfig config;

  @Autowired
  CustomerRepository repo;

  @Autowired
  AccountRepository accountRepo;

  WebClient milliGateway = WebClient.builder()
      .baseUrl("https://milli.mypinata.cloud/ipfs/").build();

  WebClient submarineApi = WebClient.builder()
      .baseUrl("https://managed.mypinata.cloud/api/v1/").build();

  public Mono<byte[]> getPinataNFT(String id) {
    Map<String,Object> body = new HashMap<>();
    body.put("timeoutSeconds", 3600);
    body.put("contentIds", Collections.singletonList(id));

    String resp = submarineApi.post().uri("/auth/content/jwt")
        .header("x-api-key", config.getApiKey())
        .header("Content-Type", "application/json")
        .body(BodyInserters.fromValue(body)).retrieve().bodyToMono(String.class).doOnError(r -> r.printStackTrace()).block();

    PinataUploadResponse content  = submarineApi.get().uri("/content/" + id)
        .header("x-api-key", config.getApiKey())
        .header("Content-Type", "application/json")
        .retrieve().bodyToMono(PinataUploadResponse.class).doOnError(r -> r.printStackTrace()).block();


    return milliGateway.get().uri(content.item.getCid() + "?accessToken=" + resp.replaceAll("\"", ""))
        // .header("x-api-key", config.getApiKey())
        .retrieve()
        .bodyToMono(byte[].class);

  }

  public PinataUploadResponse uploadPinataNFT(MultipartFile image, String userId, boolean profilePic) throws Exception {
    MultipartBodyBuilder builder = new MultipartBodyBuilder();
    builder.part("files", image.getResource());
    builder.part("name", image.getOriginalFilename());
    builder.part("metadata", "{\"keyvalues\": { \"example\": \"value\" }}");
    builder.part("wrapWithDirectory", "false");
    builder.part("pinToIPFS", "false");
    return submarineApi.post()

        .uri("content/")
        .contentType(MediaType.MULTIPART_FORM_DATA)
        .header("x-api-key", config.getApiKey())
        .body(BodyInserters.fromMultipartData(builder.build()))
        .exchangeToMono(response -> {
          if (response.statusCode().equals(HttpStatus.OK)) {
            return response.bodyToMono(PinataUploadResponse.class);
          } else {
            System.out.println("Error uploading data " + response.bodyToMono(String.class));
            throw new RuntimeException("Error uploading");
            // throw new RuntimeException("Error uploading file" +
            // response.bodyToMono(String.class).block());
          }
        }).doOnSuccess(result -> {
          if (profilePic) {
            repo.findById(userId).ifPresent(customer -> {
              customer.setProfilePicture(result.items.get(0).id);
              repo.save(customer);
            });
          } else  {
            accountRepo.findById(userId).ifPresent(account -> {
              account.setPicture(result.items.get(0).id);
              accountRepo.save(account);
            });
          }
          
        }).block();

  }

}
