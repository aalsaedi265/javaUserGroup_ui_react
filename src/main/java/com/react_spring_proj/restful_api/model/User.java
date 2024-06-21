package com.react_spring_proj.restful_api.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


// Automatically generates getters, setters, toString(), equals(), and hashCode() methods for the fields in the class
@Data
// Generates a no-argument constructor for the class
@NoArgsConstructor
// Generates a constructor with arguments for all fields in the class
@AllArgsConstructor
// Marks the class as a JPA entity
@Entity
// Specifies the name of the database table associated with the entity
@Table(name = "users")
public class User {
    // Marks the field as the primary key of the entity
    @Id
    private String id; // Declares a field named id of type String
    private String name; // Declares a field named name of type String
    private String email; // Declares a field named email of type String
}