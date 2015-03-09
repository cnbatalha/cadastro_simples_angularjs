package com.cadastro.controller;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cadastro.model.Catequizando;
import com.cadastro.repository.CatequizandoRepository;
import com.google.common.collect.Lists;

@Controller
@RequestMapping("/catequizando")
public class CatequizandoController {

	@Autowired
	CatequizandoRepository catequizandoRepository;

	@RequestMapping(method = RequestMethod.GET)
	public @ResponseBody Collection<Catequizando> getList() {
		return Lists.newArrayList(catequizandoRepository.findAll());
	}

	@RequestMapping(method = RequestMethod.POST)
	public @ResponseBody Integer add( @RequestBody Catequizando catequizando) {
		catequizandoRepository.save(catequizando);

		return 0;
	}

}
