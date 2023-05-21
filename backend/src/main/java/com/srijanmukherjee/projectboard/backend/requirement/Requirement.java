package com.srijanmukherjee.projectboard.backend.requirement;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Requirement {
    @Id
    private String id;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @Override
    public boolean equals(Object obj) {
        if (!(obj instanceof Requirement requirement)) return false;
        if (this == obj) return true;
        return requirement.getId().equals(id);
    }

    @Override
    public int hashCode() {
        return id.hashCode();
    }
}
