
package com.react_spring_proj.restful_api.model;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GroupRepo extends JpaRepository<Group, Long> {
    Group findByName(String name);
    List<Group> findAllByUserId(String id);
}
