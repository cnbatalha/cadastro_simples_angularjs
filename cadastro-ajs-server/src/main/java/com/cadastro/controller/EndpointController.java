package com.cadastro.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;

@Controller
public class EndpointController {

	private final RequestMappingHandlerMapping handlerMapping;

	@Autowired
	public EndpointController(RequestMappingHandlerMapping handlerMapping) {
		this.handlerMapping = handlerMapping;
	}

	@RequestMapping(value = "/endpointdoc", method = RequestMethod.GET)
	public @ResponseBody Object show(Model model) {

		return this.handlerMapping.getHandlerMethods();
	}
}
