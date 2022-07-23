package com.hackmidwest.milliteambackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties
public class MilliTeamBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(MilliTeamBackendApplication.class, args);
	}

}
