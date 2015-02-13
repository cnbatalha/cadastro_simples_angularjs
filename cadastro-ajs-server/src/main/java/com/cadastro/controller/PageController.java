package com.cadastro.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class PageController {

	@RequestMapping(value = "/", method = RequestMethod.GET)
	public @ResponseBody String index() {
		return "/static/index.html";
	}

}
