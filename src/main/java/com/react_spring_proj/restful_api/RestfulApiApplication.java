package com.react_spring_proj.restful_api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class RestfulApiApplication {

	public static void main(String[] args) {
		Dotenv dotenv = Dotenv.load();
		System.setProperty("SECRET_KEY", dotenv.get("SECRET_KEY"));
		SpringApplication.run(RestfulApiApplication.class, args);
	}

}
