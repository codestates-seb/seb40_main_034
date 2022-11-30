package com.example.seb_main_project.exception;

import lombok.Getter;

public enum ExceptionCode {
    POST_NOT_FOUND(504, "Post not found"),
    TAG_NOT_FOUND(504, "Tag not found"),
    MEMBER_NOT_FOUND(404, "Member not found"),
    COMMENT_NOT_FOUND(404, "Comment not found"),
    MEMBER_EXISTS(506, "User already exists."),
    COOKIE_NOT_FOUND(504, "Cookie not found"),
    POSTLIKE_NOT_FOUND(504, "Post like not found"),
    TOKEN_NOT_FOUND(504, "Token not found"),
    UNAUTHORIZED_USER(401, "Unauthorized user");

    @Getter
    private final int status;

    @Getter
    private final String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
