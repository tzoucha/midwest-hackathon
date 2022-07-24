package com.hackmidwest.milliteambackend.service;

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
import com.hackmidwest.milliteambackend.repo.CustomerRepository;

import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

@Slf4j
@Service
public class PinataService {
  @Autowired
  PinataConfig config;

  @Autowired
  CustomerRepository repo;

  WebClient milliGateway = WebClient.builder()
      .baseUrl("https://milli.mypinata.cloud/ipfs/").build();

  WebClient submarineApi = WebClient.builder()
      .baseUrl("https://managed.mypinata.cloud/api/v1/").build();

  public Mono<byte[]> getPinataNFT(String id) {
    return milliGateway.get().uri(id)
        // .header("x-api-key", config.getApiKey())
        .retrieve()
        .bodyToMono(byte[].class);

  }

  public PinataUploadResponse uploadPinataNFT(MultipartFile image, String userId) throws Exception {
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
            log.error("Error uploading data", response.bodyToMono(String.class));
            throw new RuntimeException("Error uploading");
            // throw new RuntimeException("Error uploading file" +
            // response.bodyToMono(String.class).block());
          }
        }).doOnSuccess(result -> {
          repo.findById(userId).ifPresent(customer -> {
            customer.setProfilePicture(result.items.get(0).cid);
            repo.save(customer);
          });
        }).block();

  }

  // data.append('files',
  // fs.createReadStream('/Users/battousai/repos/midwest-hackathon/hackathon/public/profile_pic.jpeg'));
  // data.append('name', 'My File');
  // data.append('metadata', '{"keyvalues": { "example": "value" }}');
  // data.append('wrapWithDirectory', 'false');
  // data.append('pinToIPFS', 'false');

  // var config = {
  // method: 'post',
  // url: 'https://managed.mypinata.cloud/api/v1/content',
  // headers: {
  // 'x-api-key': 'j0o7Iq0m4KWbK2b5co1igo3iOfNC4ZSS',
  // ...data.getHeaders()
  // },
  // data : data
  // };
}
