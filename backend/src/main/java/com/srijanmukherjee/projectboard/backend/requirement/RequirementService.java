package com.srijanmukherjee.projectboard.backend.requirement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RequirementService {
    private final RequirementRepository requirementRepository;

    @Autowired
    public RequirementService(RequirementRepository requirementRepository) {
        this.requirementRepository = requirementRepository;
    }

    public List<Requirement> getRequirements() {
        List<Requirement> requirements = new ArrayList<>();
        requirementRepository.findAll().forEach(requirements::add);
        return requirements;
    }

    public void addRequirement(Requirement requirement) {
        requirementRepository.save(requirement);
    }
}
