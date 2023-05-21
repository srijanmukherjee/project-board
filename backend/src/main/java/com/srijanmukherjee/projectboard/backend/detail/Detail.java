package com.srijanmukherjee.projectboard.backend.detail;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.srijanmukherjee.projectboard.backend.project.Project;
import jakarta.persistence.*;

import java.util.Objects;

@Entity
public class Detail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(unique = true)
    private String url;
    @Enumerated(EnumType.ORDINAL)
    private DetailType type;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public DetailType getType() {
        return type;
    }

    public void setType(DetailType type) {
        this.type = type;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == null) return false;
        if (!(obj instanceof Detail detail)) return false;
        if (this == obj) return true;

        return url.equals(detail.getUrl()) && type.equals(detail.getType());
    }

    @Override
    public int hashCode() {
        return Objects.hash(url, type);
    }
}
