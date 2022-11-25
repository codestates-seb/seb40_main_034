package com.example.seb_main_project.security.utils;

import com.example.seb_main_project.security.response.ErrorResponse;
import com.google.gson.Gson;
import lombok.SneakyThrows;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

import javax.servlet.http.HttpServletResponse;

public class ErrorResponder {
    @SneakyThrows
    public static void sendErrorResponse(HttpServletResponse response, HttpStatus status) {
        Gson gson = new Gson();
        ErrorResponse errorResponse = ErrorResponse.of(status);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(status.value());
        response.getWriter().write(gson.toJson(errorResponse, ErrorResponse.class));
    }
}
