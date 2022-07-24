package com.hackmidwest.milliteambackend.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import lombok.Getter;
import lombok.Setter;

@ConfigurationProperties("pinata")
@Configuration
public class PinataConfig {
  private String apiKey;

  public String getApiKey() {
    return apiKey;
  }

  public PinataConfig setApiKey(String apiKey) {
    this.apiKey = apiKey;
    return this;
  }
}
