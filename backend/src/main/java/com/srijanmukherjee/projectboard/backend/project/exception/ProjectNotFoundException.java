package com.srijanmukherjee.projectboard.backend.project.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND, reason = "Project not found")
public class ProjectNotFoundException extends Exception {
}
