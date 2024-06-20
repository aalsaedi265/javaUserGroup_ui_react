
package com.react_spring_proj.restful_api;

import com.react_spring_proj.restful_api.model.Event;
import com.react_spring_proj.restful_api.model.Group;
import com.react_spring_proj.restful_api.model.GroupRepo;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.Collections;
import java.util.stream.Stream;

@Component
class Initializer implements CommandLineRunner {
    private final GroupRepo repository;

    public Initializer(GroupRepo repository) {
        this.repository = repository;
    }

    /**
     * JUG means java user group
     * Implements the run method specified in the CommandLineRunner interface.
     * Runs when the Spring Boot application starts.
     *
     * @param  strings  The array of strings passed as command line arguments
     */
    @Override
    public void run(String... strings) {
        // Seed the database with some initial data

        // Create a stream of group names and save each one to the database
        Stream.of("Seattle JUG", "Denver JUG", "Dublin JUG",
                "London JUG").forEach(name -> repository.save(new Group(name)));

        // Find the Seattle JUG group by name
        Group cityJavaGroup = repository.findByName("Seattle JUG");

        // Create an Event object to add to the Seattle JUG group
        Event event = Event.builder()
                .title("Micro Frontends for Java Developers")
                .description("JHipster now has microfrontend support!")
                .date(Instant.parse("2023-09-13T17:00:00.000Z"))
                .build();

        // Add the event to the Seattle JUG group and save the group
        cityJavaGroup.setEvents(Collections.singleton(event));
        repository.save(cityJavaGroup);

        // Print all groups in the database
        repository.findAll().forEach(System.out::println);
    }
}