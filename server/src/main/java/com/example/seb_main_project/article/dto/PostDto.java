package com.example.seb_main_project.article.dto;


import com.example.seb_main_project.article.entity.Post;
import lombok.*;


@AllArgsConstructor
@NoArgsConstructor
@ToString
@Getter
@Setter
public class PostDto {

    private Long id; //게시글 id

    private Long memberId;

    private String title;

    private String body;



    //'Post 엔티티 객체'를 'PostDto 객체'로 '변환'시켜주는 메소드
    public static PostDto toPostDto(Post post){

        return new PostDto(
                post.getId(),
                post.getMemberId(),
                post.getBody(),
                post.getTitle(),

        );
    }


}
