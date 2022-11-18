package com.example.seb_main_project.article.entity;


import com.example.seb_main_project.article.dto.PostDto;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Post extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id; //pk



    //< 기본 칼럼 설정 >

    private long memberId;


    private String title;


    private String body;


    @Column(name = "LIKE_COUNT", nullable = false)
    private long likeCount; //https://github.com/codestates-seb/seb39_main_059/blob/main/server/catvillage/src/main/java/com/twentyfour_seven/catvillage/board/entity/Board.java


    @Column(name = "COMMENT_COUNT", nullable = false)
    private long commentCount; //https://github.com/codestates-seb/seb39_main_059/blob/main/server/catvillage/src/main/java/com/twentyfour_seven/catvillage/board/entity/Board.java


    @OneToMany(mappedBy = "post", cascade = CascadeType.REMOVE)
    private final List<Comment> comments = new ArrayList<>(); //https://github.com/codestates-seb/seb39_main_059/blob/main/server/catvillage/src/main/java/com/twentyfour_seven/catvillage/board/entity/Board.java


    @OneToMany(mappedBy = "post", cascade = CascadeType.REMOVE)
    private final List<Tag> tags = new ArrayList<>(); //https://github.com/codestates-seb/seb39_main_059/blob/main/server/catvillage/src/main/java/com/twentyfour_seven/catvillage/board/entity/Board.java


    @OneToMany(mappedBy = "post", cascade = CascadeType.REMOVE)
    private final List<Like> likes = new ArrayList<>(); //https://github.com/codestates-seb/seb39_main_059/blob/main/server/catvillage/src/main/java/com/twentyfour_seven/catvillage/board/entity/Board.java
                                //게시글 좋아요 https://github.com/codestates-seb/seb39_main_059/blob/main/server/catvillage/src/main/java/com/twentyfour_seven/catvillage/board/controller/BoardController.java


    public Post(){
        likeCount = 0L;
        commentCount = 0L;
    }


//=============================================================================================================

    //< 'PostDto 객체'를 'Post 엔티티 객체'로 변환시켜서 entity를 생성해주는 로직 >
    //'Mapper'를 작성했다면, 'Mapper'의 역할이기도 함
    public static Post toPost(PostDto postDto) {

        if(postDto.getId() != null)
            throw new IllegalArgumentException("게시글 생성 실패! ");

        return new Post(
                postDto.getId(),
                postDto.getMemberId(),
                postDto.getTitle(),
                postDto.getBody()
        );
    }

    //========================================================================================================

    //'게시글 수정 작업 후', 'postDto 객체'를 'post 엔티티 객체'로 변환
    public void patch(PostDto postDto){
        if(this.id != postDto.getId())
            throw new IllegalArgumentException("게시글 수정 실패! 잘못된 id가 입력되었습니다! <--이거 영어로 바꾸기");

        if(postDto.getTitle() != null)
            this.title = postDto.getTitle();

        if(postDto.getMemberId() != null)
            this.memberId = postDto.getMemberId();

        if(postDto.getBody() != null)
            this.body = postDto.getBody();

    }

    //< 위도, 경도 추가하기 >



}
