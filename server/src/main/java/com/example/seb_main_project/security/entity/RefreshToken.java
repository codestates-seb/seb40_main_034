package com.example.seb_main_project.security.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RefreshToken {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "REFRESH_TOKEN_ID", nullable = false)
    private Integer id;

    @Column(name = "TOKEN_VALUE", nullable = false)
    private String tokenValue;

    @Column(name = "TOKEN_EMAIL", nullable = false)
    private String tokenEmail;

    @Column
    private Integer memberId;
}
