

package com.react_spring_proj.restful_api.controller;

import java.io.IOException;

import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class CookieCsrfFilter  extends OncePerRequestFilter{

   
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        // Get the CSRF token from the request attribute
        CsrfToken csrfToken = (CsrfToken) request.getAttribute(CsrfToken.class.getName());
        // Set the CSRF token in the HTTP response header
        response.setHeader(csrfToken.getHeaderName(), csrfToken.getToken());
        // Continue with the filter chain
        filterChain.doFilter(request, response);
    }
}
