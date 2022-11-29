package com.example.seb_main_project.post.dto;


import lombok.*;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
@ToString
public class PostPostDto {
    private String gpsX;
    private String gpsY;
    private String contents;
    }
