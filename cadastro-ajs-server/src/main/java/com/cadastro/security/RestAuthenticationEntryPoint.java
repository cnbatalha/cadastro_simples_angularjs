package com.cadastro.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

public class RestAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest arg0, HttpServletResponse response, AuthenticationException arg2)
	    throws IOException, ServletException {
	// TODO Auto-generated method stub
	response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Não autorizado");
    }

}
