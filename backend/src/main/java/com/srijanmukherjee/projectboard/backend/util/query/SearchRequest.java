package com.srijanmukherjee.projectboard.backend.util.query;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class SearchRequest implements Serializable {
    private List<FilterRequest> filters;
    private List<SortRequest> sorts;
    private Integer page;
    private Integer size;

    public List<FilterRequest> getFilters() {
        if (Objects.isNull(filters)) return new ArrayList<>();
        return filters;
    }

    public void setFilters(List<FilterRequest> filters) {
        this.filters = filters;
    }

    public Integer getPage() {
        return page;
    }

    public void setPage(Integer page) {
        this.page = page;
    }

    public Integer getSize() {
        return size;
    }

    public void setSize(Integer size) {
        this.size = size;
    }

    public List<SortRequest> getSorts() {
        return sorts;
    }

    public void setSorts(List<SortRequest> sorts) {
        this.sorts = sorts;
    }
}
