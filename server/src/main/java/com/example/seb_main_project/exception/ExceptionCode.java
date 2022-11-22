package com.example.seb_main_project.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_EXISTS(506, "User already exists."),
    MEMBER_NOT_FOUND(504,"Member not found");

    @Getter
    private final int status;

    @Getter
    private final String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
