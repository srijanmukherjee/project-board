package com.srijanmukherjee.projectboard.backend.security;

import com.srijanmukherjee.projectboard.backend.security.models.Authority;
import com.srijanmukherjee.projectboard.backend.security.models.ProjectBoardUserDetails;
import com.srijanmukherjee.projectboard.backend.security.models.User;
import com.srijanmukherjee.projectboard.backend.security.repository.AuthorityRepository;
import com.srijanmukherjee.projectboard.backend.security.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectBoardUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;
    private final AuthorityRepository authorityRepository;

    @Autowired
    public ProjectBoardUserDetailsService(UserRepository userRepository, AuthorityRepository authorityRepository) {
        this.userRepository = userRepository;
        this.authorityRepository = authorityRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository
                .findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Username not found"));

        List<SimpleGrantedAuthority> authorities = authorityRepository
                .findAllByUser_Username(username)
                .stream()
                .map(Authority::getAuthority)
                .map(SimpleGrantedAuthority::new)
                .toList();

        return new ProjectBoardUserDetails(user, authorities);
    }
}
