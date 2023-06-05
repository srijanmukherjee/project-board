package com.srijanmukherjee.projectboard.backend.project;

import com.srijanmukherjee.projectboard.backend.detail.Detail;
import com.srijanmukherjee.projectboard.backend.requirement.Requirement;
import jakarta.persistence.*;

import java.util.Set;

@Entity
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(unique = true)
    private String title;
    @ManyToMany
    private Set<Requirement> requirements;
    @Enumerated(EnumType.ORDINAL)
    private ProjectStatus status;
    @OneToMany(orphanRemoval = true, cascade = CascadeType.ALL)
    private Set<Detail> details;

    public Project() { }

    public Project(String title, Set<Requirement> requirements) {
        this.title = title;
        this.requirements = requirements;
        this.status = ProjectStatus.NOT_STARTED;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Set<Requirement> getRequirements() {
        return requirements;
    }

    public void setRequirements(Set<Requirement> requirements) {
        this.requirements = requirements;
    }

    public ProjectStatus getStatus() {
        return status;
    }

    public void setStatus(ProjectStatus status) {
        this.status = status;
    }

    public Set<Detail> getDetails() {
        return details;
    }

    public void setDetails(Set<Detail> details) {
        this.details = details;
    }
}
