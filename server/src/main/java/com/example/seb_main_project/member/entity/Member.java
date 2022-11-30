package com.example.seb_main_project.member.entity;

import com.example.seb_main_project.audit.Auditable;
import com.example.seb_main_project.postlike.entity.PostLike;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.security.Principal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class Member extends Auditable implements Principal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column
    private LocalDateTime latestLogin;

    @Column
    private String nickname;

    // Security 유저 권한
    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    @Override
    public String getName() {
        return getEmail();
    }


    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @ToString.Exclude
    private List<PostLike> postLikes = new ArrayList<>();

    public void setPostLikes(PostLike postLike) {
        this.postLikes.add(postLike);
    }
}
