package com.srijanmukherjee.projectboard.backend.project;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface ProjectRepository
        extends CrudRepository<Project, Integer>,
                PagingAndSortingRepository<Project, Integer>,
                JpaSpecificationExecutor<Project> {
}