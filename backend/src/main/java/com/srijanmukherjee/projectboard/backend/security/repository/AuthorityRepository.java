package com.srijanmukherjee.projectboard.backend.security.repository;

import com.srijanmukherjee.projectboard.backend.security.models.Authority;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AuthorityRepository extends JpaRepository<Authority, Long> {
    List<Authority> findAllByUser_Username(String username);
}
