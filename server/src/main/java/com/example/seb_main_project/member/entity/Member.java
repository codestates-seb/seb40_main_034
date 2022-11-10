package com.example.seb_main_project.member.entity;

import lombok.RequiredArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.*;

@Entity
@RequiredArgsConstructor
public class Member {
    @Id
    private Long id;
}
