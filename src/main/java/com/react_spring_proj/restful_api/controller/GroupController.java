package com.react_spring_proj.restful_api.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.react_spring_proj.restful_api.model.Group;
import com.react_spring_proj.restful_api.model.GroupRepo;
import com.react_spring_proj.restful_api.model.User;
import com.react_spring_proj.restful_api.model.UserRepo;

import java.net.URI;
import java.net.URISyntaxException;
import java.security.Principal;
import java.util.Collection;
import java.util.Map;
import java.util.Optional;
import jakarta.validation.Valid;
import javax.swing.text.html.Option;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
class GroupController {

    private final Logger log = LoggerFactory.getLogger(GroupController.class);
    private GroupRepo groupRepo;
    private final UserRepo userRepo;

    public GroupController(GroupRepo groupRepo, UserRepo userRepo) {
        this.groupRepo = groupRepo;
        this.userRepo = userRepo;
    }

    @GetMapping("/groups")
    Collection<Group> groups(Principal principal) {
        return groupRepo.findAllByUserId(principal.getName());
    }

    @GetMapping("/groups/{id}")
    ResponseEntity<?> group(@PathVariable Long id) {
        Optional<Group> group = groupRepo.findById(id);
        return group.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/groups")
    ResponseEntity<Group> createGroup(@Valid @RequestBody Group group,
            @AuthenticationPrincipal OAuth2User principal) throws URISyntaxException {
        log.info("Request to create group: {}", group);
        Map<String, Object> details = principal.getAttributes();
        String userId = details.get("sub").toString();

        // check to see if user already exists
        Optional<User> user = userRepo.findById(userId);
        group.setUser(user.orElse(new User(userId,
                details.get("name").toString(), details.get("email").toString())));

        Group result = groupRepo.save(group);
        return ResponseEntity.created(new URI("/api/group/" + result.getId()))
                .body(result);
    }

    @PutMapping("/groups/{id}")
    ResponseEntity<Group> updateGroup(@Valid @RequestBody Group group) {
        log.info("Request to update group: {}", group);
        Group result = groupRepo.save(group);
        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/groups/{id}")
    public ResponseEntity<?> deleteGroup(@PathVariable Long id) {
        log.info("Request to delete group: {}", id);
        groupRepo.deleteById(id);
        return ResponseEntity.ok().build();
    }

}
