package com.example.seb_main_project.follow.entity;

import com.example.seb_main_project.member.entity.Member;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@org.hibernate.annotations.DynamicUpdate
@Table(name = "Follow")
public class Follow {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int follow_id;

    @ManyToOne
    @JoinColumn(name = "following")
    Member following;

    @ManyToOne
    @JoinColumn(name = "follower")
    Member follower;
}
