package com.srijanmukherjee.projectboard.backend.requirement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/requirements")
public class RequirementController {
    private final RequirementService requirementService;

    @Autowired
    public RequirementController(RequirementService requirementService) {
        this.requirementService = requirementService;
    }

    @RequestMapping("")
    public List<String> getRequirements() {
        return requirementService.getRequirements()
                .stream()
                .map(Requirement::getId)
                .toList();
    }

    @RequestMapping(method = RequestMethod.POST, value = "")
    public void addRequirement(@RequestBody Requirement requirement) {
        requirementService.addRequirement(requirement);
    }
}
