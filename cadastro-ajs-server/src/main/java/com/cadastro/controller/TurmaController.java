package com.cadastro.controller;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cadastro.model.Turma;
import com.cadastro.repository.TurmaRepository;
import com.google.common.collect.Lists;

@Controller
@RequestMapping("/turma")
@Secured("ROLE_ADMIN")
public class TurmaController {

    @Autowired
    TurmaRepository turmaRepository;

    // presponse.setHeader("Access-Control-Allow-Credentials", "true");
    private static final String[] controllerHeader = { "Access-Control-Allow-Origin:*",
	    "Access-Control-Allow-Methods:POST, GET, OPTIONS, DELETE, HEAD", "Access-Control-Max-Age:3600",
	    "Access-Control-Allow-Headers:Origin, x-requested-with, Content-Type, Accept, Authorization" };

    @RequestMapping(method = RequestMethod.GET)
    public @ResponseBody Collection<Turma> getList() {
	return Lists.newArrayList(turmaRepository.findAll());
    }

    @RequestMapping(value = "/{idTurma}", method = RequestMethod.GET)
    public @ResponseBody Turma getTurma(@PathVariable Integer idTurma) {
	return turmaRepository.findOne(idTurma);
    }

}
