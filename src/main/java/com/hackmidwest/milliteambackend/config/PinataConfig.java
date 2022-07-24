package com.hackmidwest.milliteambackend.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import lombok.Getter;
import lombok.Setter;

@ConfigurationProperties("pinata")
@Configuration
@Getter
@Setter
public class PinataConfig {
  private String apiKey;
  
}
