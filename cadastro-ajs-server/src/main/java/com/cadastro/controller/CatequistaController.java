package com.cadastro.controller;

import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cadastro.model.Catequista;
import com.cadastro.repository.CatequistaRepository;
import com.google.common.collect.Lists;

@Controller
public class CatequistaController {

	@Autowired
	CatequistaRepository catequistaRepository;

	@RequestMapping(value = "/catequista", method = RequestMethod.GET)
	public @ResponseBody Collection<Catequista> getLista() {
		return Lists.newArrayList(catequistaRepository.findAll());
	}

}
