package com.example.seb_main_project.post.entity;

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
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class BaseTimeEntity {


    @CreatedDate
    private LocalDateTime createdTime;


    @LastModifiedDate
    private LocalDateTime lastModifiedTime;

}
