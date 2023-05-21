package com.srijanmukherjee.projectboard.backend.project;

import com.srijanmukherjee.projectboard.backend.detail.Detail;
import com.srijanmukherjee.projectboard.backend.detail.DetailRepository;
import com.srijanmukherjee.projectboard.backend.project.exception.ProjectNotFoundException;
import com.srijanmukherjee.projectboard.backend.requirement.Requirement;
import com.srijanmukherjee.projectboard.backend.requirement.RequirementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final RequirementRepository requirementRepository;
    private final DetailRepository detailRepository;

    @Autowired
    public ProjectService(ProjectRepository projectRepository,
                          RequirementRepository requirementRepository,
                          DetailRepository detailRepository) {
        this.projectRepository = projectRepository;
        this.requirementRepository = requirementRepository;
        this.detailRepository = detailRepository;
    }

    public List<Project> getProjects() {
        List<Project> projects = new ArrayList<>();
        projectRepository.findAll()
                .forEach(projects::add);
        return projects;
    }

    public Project getProject(Integer id) throws ProjectNotFoundException {
        return projectRepository.findById(id).orElseThrow(ProjectNotFoundException::new);
    }

    public void addProject(Project project) {
        if (project.getRequirements() == null || project.getRequirements().size() == 0)
            throw new IllegalArgumentException("project must have at least one requirement");

        Project p = new Project();
        p.setTitle(project.getTitle());
        p.setRequirements(project.getRequirements());
        p.setStatus(project.getStatus());
        p.setDetails(project.getDetails());

        projectRepository.save(p);
    }

    public void updateProject(Integer id, Project project) throws ProjectNotFoundException {
        Project oldProject = projectRepository.findById(id).orElseThrow(ProjectNotFoundException::new);

        if (project.getRequirements() != null && project.getRequirements().size() > 0) {
            Set<Requirement> oldRequirements = oldProject.getRequirements();
            Set<Requirement> newRequirements = project.getRequirements();

            // Create and add new requirements
            for (Requirement requirement : newRequirements) {
                if (!requirementRepository.existsById(requirement.getId()))
                    requirementRepository.save(requirement);

                oldRequirements.add(requirement);
            }

            // Delete the old requirements
            oldRequirements.removeIf(requirement -> !newRequirements.contains(requirement));
            project.setRequirements(oldRequirements);
        }

        if (project.getDetails() != null) {
            Set<Detail> oldDetails = oldProject.getDetails();
            Set<Detail> newDetails = project.getDetails();

            oldDetails.addAll(newDetails);

            for (Detail detail : oldDetails) {
                if (!newDetails.contains(detail)) {
                    detailRepository.delete(detail);
                }
            }

            oldDetails.removeIf(detail -> !newDetails.contains(detail));
            project.setDetails(oldDetails);
        }

        if (project.getTitle() != null &&
            project.getTitle().equals(oldProject.getTitle()))
            oldProject.setTitle(project.getTitle());

        if (project.getStatus() != null && project.getStatus() != oldProject.getStatus())
            oldProject.setStatus(project.getStatus());

        projectRepository.save(oldProject);
    }

    public void deleteProject(Integer id) throws ProjectNotFoundException {
        if (!projectRepository.existsById(id))
            throw new ProjectNotFoundException();
        projectRepository.deleteById(id);
    }

    public void addProjectRequirement(Integer id, Requirement requirement) throws ProjectNotFoundException {
        if (!projectRepository.existsById(id))
            throw new ProjectNotFoundException();

        if (!requirementRepository.existsById(requirement.getId()))
            requirementRepository.save(requirement);

        Project project = projectRepository.findById(id).orElseThrow(ProjectNotFoundException::new);
        Set<Requirement> requirements = project.getRequirements();
        requirements.add(requirement);
        project.setRequirements(requirements);
        projectRepository.save(project);
    }

    public void removeProjectRequirement(Integer id, Requirement requirement) throws ProjectNotFoundException {
        Project project = projectRepository.findById(id).orElseThrow(ProjectNotFoundException::new);
        Set<Requirement> requirements = project.getRequirements();

        if (requirements.size() <= 1)
            throw new UnsupportedOperationException("A project must have at least 1 requirement");

        requirements.removeIf(r -> Objects.equals(r.getId(), requirement.getId()));
        project.setRequirements(requirements);
        projectRepository.save(project);
    }
}
