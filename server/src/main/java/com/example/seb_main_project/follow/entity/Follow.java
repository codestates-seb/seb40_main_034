package com.example.seb_main_project.follow.entity;

import com.example.seb_main_project.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "FOLLOW")
public class Follow {
    @Id
    @Column(name = "FOLLOW_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "FOLLOWING")
    private Member following;

    @ManyToOne
    @JoinColumn(name = "FOLLOWER")
    private Member follower;

}
