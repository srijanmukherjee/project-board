package com.srijanmukherjee.projectboard.backend.project;

import java.util.List;

public record ProjectResponse(List<Project> projects,
                              int page,
                              int totalPages,
                              long totalProjects,
                              int projectPerPage) {
}
