package com.example.seb_main_project.member.service;

import lombok.Getter;

public enum ExceptionCode {
    USER_EXISTS(506, "User already exists.");

    @Getter
    private final int status;

    @Getter
    private final String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
