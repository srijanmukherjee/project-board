package com.srijanmukherjee.projectboard.backend.security;

import com.srijanmukherjee.projectboard.backend.security.exception.IncorrectUsernameAndPassword;
import com.srijanmukherjee.projectboard.backend.security.models.AuthenticationRequest;
import com.srijanmukherjee.projectboard.backend.security.models.AuthenticationResponse;
import com.srijanmukherjee.projectboard.backend.security.models.ProjectBoardUserDetails;
import com.srijanmukherjee.projectboard.backend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    @Autowired
    public AuthenticationController(AuthenticationManager authenticationManager,  JwtUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticate(@RequestBody AuthenticationRequest authenticationRequest)
        throws IncorrectUsernameAndPassword {

        try {

            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    authenticationRequest.getUsername(),
                    authenticationRequest.getPassword())
            );

            UserDetails userDetails = (ProjectBoardUserDetails) authentication.getPrincipal();
            String jwt = jwtUtil.generateToken(userDetails);
            return ResponseEntity.ok(new AuthenticationResponse(jwt));

        } catch (BadCredentialsException | UsernameNotFoundException e) {
            throw new IncorrectUsernameAndPassword();
        }
    }
}