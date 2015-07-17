package com.cadastro.security;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.www.BasicAuthenticationEntryPoint;

public class PlainTextBasicAuthenticationEntryPoint extends BasicAuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException)
	    throws IOException, ServletException {
	response.setHeader("Accept","application/json");
	response.addHeader("Access-Control-Allow-Origin", "*");
	response.setHeader("Access-Control-Allow-Credentials", "true");
	response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, HEAD");
	response.setHeader("Access-Control-Max-Age", "3600");
	response.setHeader("Access-Control-Allow-Headers",
		"Origin, x-requested-with, Content-Type, Accept, Authorization, crossdomain");
	response.addHeader("WWW-Authenticate", "Basic realm=\"" + getRealmName() + "\"");
	// response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
	// PrintWriter writer = response.getWriter();
	// writer.println("HTTP Status " + HttpServletResponse.SC_UNAUTHORIZED +
	// " - " + authException.getMessage());
    }
}
