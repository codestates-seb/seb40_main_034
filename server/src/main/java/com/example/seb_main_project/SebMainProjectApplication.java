package com.example.seb_main_project;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class SebMainProjectApplication {

    public static void main(String[] args) {
        SpringApplication.run(SebMainProjectApplication.class, args);
    }

}
