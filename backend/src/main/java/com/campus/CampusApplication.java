package com.campus;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CampusApplication {
    public static void main(String[] args) {
        SpringApplication.run(CampusApplication.class, args);
        System.out.println("========================================");
        System.out.println("🚀 Smart Campus API is Running!");
        System.out.println("📍 http://localhost:8080");
        System.out.println("📚 API: http://localhost:8080/api/resources");
        System.out.println("========================================");
    }
}