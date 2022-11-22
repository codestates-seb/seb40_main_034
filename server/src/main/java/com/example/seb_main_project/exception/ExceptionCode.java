package com.example.seb_main_project.exception;

import lombok.Getter;

public enum ExceptionCode {

    POST_NOT_FOUND(404, "Post not found");
    POST_COMMENT_NOT_FOUND(404, "Post comment not found");
    POST_TAG_NOT_FOUND(404, "Post not found");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message){

        this.status = code;
        this.message = message;
    }

}
