package com.srijanmukherjee.projectboard.backend.security.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.FORBIDDEN, reason = "Incorrect username and password")
public class IncorrectUsernameAndPassword extends Exception {}
