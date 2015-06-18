package com.cadastro;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class AccessFilter implements Filter {

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
	// TODO Auto-generated method stub

    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException,
	    ServletException {
	// TODO Auto-generated method stub

	HttpServletResponse presponse = (HttpServletResponse) response;
	presponse.setHeader("Access-Control-Allow-Origin", "*");
	presponse.setHeader("Access-Control-Allow-Credentials", "true");
	presponse.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, HEAD");
	presponse.setHeader("Access-Control-Max-Age", "3600");
	presponse.setHeader("Access-Control-Allow-Headers",
		"Origin, x-requested-with, Content-Type, Accept, Authorization");

	HttpServletRequest httpRequest = (HttpServletRequest) request;
	
	if (httpRequest.getMethod().equalsIgnoreCase("OPTIONS")) {
	    presponse.setStatus(200);
	}
	
	chain.doFilter(request, response);

    }

    @Override
    public void destroy() {
	// TODO Auto-generated method stub
    }

}
