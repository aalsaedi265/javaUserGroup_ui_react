
package com.react_spring_proj.restful_api.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;

@RestController
public class UserController {
    private ClientRegistration registration;
    public UserController(ClientRegistrationRepository registrations) {
        this.registration = registrations.findByRegistrationId("auth0");
    }

    /**
     * getUser API, takes an OAuth2User object as parameter
     * and returns user attributes as a response
     * @param user The OAuth2User object
     * @return ResponseEntity that contains user attributes
     */
    @GetMapping("/api/user")
    public ResponseEntity<?> getUser(@AuthenticationPrincipal OAuth2User user) {
        if (user == null) {
            return new ResponseEntity<>("", HttpStatus.OK);
        }
        return ResponseEntity.ok().body(user.getAttribute(null));
    }

    /**
     * logout API, takes a HttpServletRequest object as parameter
     * and invalidates the session and returns a logout URL as a response
     * @param request The HttpServletRequest object
     * @return ResponseEntity that contains a logout URL
     */
    @PostMapping("/api/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        StringBuilder logoutUrl = new StringBuilder();
        String issuerUri = this.registration.getProviderDetails().getIssuerUri();
        logoutUrl.append(issuerUri.endsWith("/") ? issuerUri + "v2/logout" : issuerUri + "/v2/logout");
        logoutUrl.append("?client_id=").append(this.registration.getClientId());

        Map<String, String> logoutDetails = new HashMap<>();
        logoutDetails.put("logoutUrl", logoutUrl.toString());
        request.getSession(false).invalidate();
        return ResponseEntity.ok().body(logoutDetails);
    }
}
