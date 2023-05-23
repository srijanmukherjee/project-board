package com.srijanmukherjee.projectboard.backend.project;

import com.srijanmukherjee.projectboard.backend.project.exception.ProjectNotFoundException;
import com.srijanmukherjee.projectboard.backend.requirement.Requirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectService projectService;

    @Autowired
    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping("")
    public List<Project> getProjects() {
        return projectService.getProjects();
    }

    @PostMapping("")
    public void addProject(@RequestBody Project project) {
        projectService.addProject(project);
    }

    @PutMapping("/{id}")
    public void updateProject(@RequestBody Project project, @PathVariable Integer id)
        throws ProjectNotFoundException {
        projectService.updateProject(id, project);
    }

    @PutMapping("/{id}/requirements")
    public void addProjectRequirement(@RequestBody Requirement requirement, @PathVariable Integer id)
        throws ProjectNotFoundException {
        projectService.addProjectRequirement(id, requirement);
    }

    @DeleteMapping("/{id}/requirements")
    public void removeProjectRequirement(@RequestBody Requirement requirement, @PathVariable Integer id)
        throws ProjectNotFoundException {
        projectService.removeProjectRequirement(id, requirement);
    }

    @DeleteMapping("/{id}")
    public void deleteProject(@PathVariable Integer id) throws ProjectNotFoundException {
        projectService.deleteProject(id);
    }

    @GetMapping("/{id}")
    public Project getProject(@PathVariable Integer id) throws ProjectNotFoundException {
        return projectService.getProject(id);
    }
}
