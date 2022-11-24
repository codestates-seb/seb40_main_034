package com.example.seb_main_project.member.service;

import com.example.seb_main_project.member.entity.Member;
import com.example.seb_main_project.member.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService{
	
	@Autowired
	private MemberRepository memberRepository;
	
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		
		Member member = memberRepository.findByEmail(email);
	
		CustomUserDetails userDetails = null;
		if(member != null) {
			userDetails = new CustomUserDetails();
			userDetails.setMember(member);
			
		}else {
			throw new UsernameNotFoundException("유저를 찾을 수 없습니다. "+email);
		}
		return userDetails;
	}
}
