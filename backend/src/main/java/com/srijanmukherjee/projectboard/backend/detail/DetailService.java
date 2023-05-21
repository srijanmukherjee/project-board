package com.srijanmukherjee.projectboard.backend.detail;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DetailService {
    private final DetailRepository detailRepository;

    @Autowired
    public DetailService(DetailRepository detailRepository) {
        this.detailRepository = detailRepository;
    }

    public List<Detail> getDetails() {
        List<Detail> details = new ArrayList<>();
        detailRepository.findAll().forEach(details::add);
        return details;
    }
}
