package com.example.seb_main_project.article.entity;

import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import java.time.LocalDateTime;

//https://europani.github.io/spring/2021/10/05/027-baseTimeEntity.html
//https://somida.tistory.com/209
//https://dkswnkk.tistory.com/542

@Getter
@MappedSuperclass //BaseEntity를 상속한 엔티티들은 아래 필드들을 컬럼으로 인식하게 된다.
                  //즉, 'JPA Entity 클래스들'이 이제 'BaseTimeEntity'를 상속할 경우, 'createdTime'과 'lastModifiedTime'을
                  //'컬럼'으로 인식하게 됨
@EntityListeners(AuditingEntityListener.class)  // Auditing(자동으로 값 매핑) 기능 추가
public abstract class BaseTimeEntity {


    @CreatedDate //'entity'가 최초로 생성되어 저장될 때 시간이 자동으로 저장됨
    private LocalDateTime createdTime;

    @LastModifiedDate
    private LocalDateTime lastModifiedTime;

}
