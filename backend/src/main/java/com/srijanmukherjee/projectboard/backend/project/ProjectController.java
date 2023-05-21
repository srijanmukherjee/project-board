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

    @RequestMapping("")
    public List<Project> getProjects() {
        return projectService.getProjects();
    }

    @RequestMapping(method = RequestMethod.POST, value = "")
    public void addProject(@RequestBody Project project) {
        projectService.addProject(project);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/{id}")
    public void updateProject(@RequestBody Project project, @PathVariable Integer id)
        throws ProjectNotFoundException {
        projectService.updateProject(id, project);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/{id}/requirements")
    public void addProjectRequirement(@RequestBody Requirement requirement, @PathVariable Integer id)
        throws ProjectNotFoundException {
        projectService.addProjectRequirement(id, requirement);
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/{id}/requirements")
    public void removeProjectRequirement(@RequestBody Requirement requirement, @PathVariable Integer id)
        throws ProjectNotFoundException {
        projectService.removeProjectRequirement(id, requirement);
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/{id}")
    public void deleteProject(@PathVariable Integer id) throws ProjectNotFoundException {
        projectService.deleteProject(id);
    }

    @RequestMapping("/{id}")
    public Project getProject(@PathVariable Integer id) throws ProjectNotFoundException {
        return projectService.getProject(id);
    }
}
