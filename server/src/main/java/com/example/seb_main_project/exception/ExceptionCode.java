package com.example.seb_main_project.exception;

import lombok.Getter;

public enum ExceptionCode {
    POST_NOT_FOUND(504, "Post not found"),
    TAG_NOT_FOUND(504, "Tag not found"),
    MEMBER_EXISTS(506, "User already exists."),
    MEMBER_NOT_FOUND(504, "Member not found"),
    COOKIE_NOT_FOUND(504, "Cookie not found"),
    TOKEN_NOT_FOUND(504, "Token not found"),
    COMMENT_NOT_FOUND(504, "Comment not found");

    @Getter
    private final int status;

    @Getter
    private final String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
