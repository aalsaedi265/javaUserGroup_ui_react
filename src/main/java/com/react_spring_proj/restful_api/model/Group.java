package com.react_spring_proj.restful_api.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import jakarta.persistence.*;
import java.util.Set;


/** This class represents a Group entity, which consists of a name, address, city, state, country, postal code, user, and events. */
@Data
@NoArgsConstructor
@RequiredArgsConstructor
@Entity
@Table(name = "user_group")
public class Group {
    /** The unique identifier for the group. */
    @Id
    @GeneratedValue
    private Long id;
    /** The name of the group. */
    @NonNull
    private String name;
    /** The address of the group. */
    private String address;
    /** The city where the group is located. */
    private String city;
    /** The state or province where the group is located. */
    private String stateOrProvince;
    /** The country where the group is located. */
    private String country;
    /** The postal code of the group's address. */
    private String postalCode;
    /** The user who created the group. */
    @ManyToOne(cascade=CascadeType.PERSIST)
    private User user;

    /** The events associated with the group. */
    @OneToMany(fetch = FetchType.EAGER, cascade=CascadeType.ALL)
    private Set<Event> events;
}


