package com.example.seb_main_project.security.userdetails;

import com.example.seb_main_project.exception.BusinessLogicException;
import com.example.seb_main_project.exception.ExceptionCode;
import com.example.seb_main_project.member.entity.Member;
import com.example.seb_main_project.member.repository.MemberRepository;
import com.example.seb_main_project.security.utils.CustomAuthorityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Optional;

/**
 * Custom UserDetailsService 구현을 위한 UserDetailsService 구현 클래스
 *
 * @author dev32user
 */
@Component
@RequiredArgsConstructor
public class MemberDetailsService implements UserDetailsService {
    private final MemberRepository memberRepository;
    private final CustomAuthorityUtils authorityUtils;

    /**
     * 데이터베이스에서 유저 정보를 조회해 UserDetails 클래스를 리턴하는 오버라이딩 메서드
     *
     * @param email 찾을 유저 이름
     * @return UserDetails : UserDetailsService 에 의해 load 되어 인증을 위해 사용되는 핵심 User 정보를 표현하는 인터페이스로,
     * 해당 인터페이스의 구현체는 Spring Security 에서 보안 정보 제공을 목적으로 Authentication 객체로 캡슐화 되어 제공된다. <br>
     * 따라서 직접 사용되지는 않는다.
     * @throws UsernameNotFoundException notFound 예외
     * @author dev32user
     */
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        Member findMember = optionalMember.orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        /*
            데이터베이스에서 조회한 User 클래스의 객체를 반환하면 Spring Security가 해당 정보를 이용해 인증 절차를 수행한다.
            인증 처리는 Spring Security에서 이뤄진다.
         */
        return new MemberDetails(findMember);
    }

    private class MemberDetails extends Member implements UserDetails {
        MemberDetails(Member member) {
            setId(member.getId());
            setEmail(member.getEmail());
            setPassword(member.getPassword());
            setRoles(member.getRoles());
        }

        /**
         * 데이터 베이스에서 조회한 회원의 이메일 정보를 이용해 Role 기반의 권한 정보 컬렉션을 생성한다.
         * Role 기반의 권한 정보 : GrantedAuthority
         *
         * @author dev32user
         */
        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {
            return authorityUtils.createAuthorities(this.getRoles());
        }

        @Override
        public String getUsername() {
            return getEmail();
        }

        @Override
        public boolean isAccountNonExpired() {
            return true;
        }

        @Override
        public boolean isAccountNonLocked() {
            return true;
        }

        @Override
        public boolean isCredentialsNonExpired() {
            return true;
        }

        @Override
        public boolean isEnabled() {
            return true;
        }
    }
}
