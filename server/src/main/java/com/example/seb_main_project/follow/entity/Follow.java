package com.example.seb_main_project.follow.entity;

import com.example.seb_main_project.member.entity.Member;
import lombok.*;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@Table(name = "Follow")
public class Follow {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "following")
    private Member followingMember;

    @ManyToOne
    @JoinColumn(name = "follower")
    private Member followedMember;

    @Builder
    public Follow(Member followingMember, Member followedMember) {
        this.followingMember = followingMember;
        this.followedMember = followedMember;
    }
}
