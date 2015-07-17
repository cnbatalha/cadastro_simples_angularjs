package com.cadastro.controller;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cadastro.model.Catequista;
import com.cadastro.repository.CatequistaRepository;
import com.cadastro.specification.CatequistaSpec;
import com.google.common.collect.Lists;

@Controller
@RequestMapping("/catequista")
public class CatequistaController {

    @Autowired
    CatequistaRepository catequistaRepository;

    @RequestMapping(method = RequestMethod.GET)
    public @ResponseBody Collection<Catequista> getLista() {

	return Lists.newArrayList(catequistaRepository.findAll());
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    @ResponseBody
    public boolean login(@RequestBody String hashLogin) {

	/*String login = "";// hashLogin.get("login");
	String passwd = "";// hashLogin.get("passwd");

	List<Catequista> list = catequistaRepository.findAll(CatequistaSpec.login(login, passwd));*/

	return true;
    }

    @RequestMapping(value = "/teste", method = RequestMethod.GET)
    public @ResponseBody String getTeste() {

	return "it's work!";
    }

}
