package com.cadastro.controller;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cadastro.model.Catequizando;
import com.cadastro.repository.CatequizandoRepository;
import com.cadastro.specification.CatequizandoSpec;
import com.google.common.collect.Lists;

@Controller
@RequestMapping("/catequizando")
public class CatequizandoController {

	@Autowired
	CatequizandoRepository catequizandoRepository;

	@RequestMapping(method = RequestMethod.GET)
	public @ResponseBody Collection<Catequizando> getList() {

		return Lists.newArrayList(catequizandoRepository.findBySituacao("N",
				sortByNomeAsc()));

	}

	// carrega registros usando paginacao
	@RequestMapping(value = "/page/{indexPage}/{count}", method = RequestMethod.GET)
	public @ResponseBody Page<Catequizando> getListPage(
			@PathVariable("indexPage") Integer indexPage,
			@PathVariable("count") Integer count) {

		Page<Catequizando> page = catequizandoRepository
				.findAll(new PageRequest(indexPage, count, sortByNomeAsc()));

		return page;
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public @ResponseBody Catequizando getCatequizando(
			@PathVariable("id") Integer id) {
		return catequizandoRepository.findOne(id);
	}

	@RequestMapping(value = "/nome/{nome}/page/{indexPage}/{count}", method = RequestMethod.GET)
	public @ResponseBody Page<Catequizando> getCatequizandoByName(
			@PathVariable("nome") String nome,
			@PathVariable("indexPage") Integer indexPage,
			@PathVariable("count") Integer count) {

		return catequizandoRepository.findAll(CatequizandoSpec.isNameLike(nome
				+ "%"), new PageRequest(indexPage, count, sortByNomeAsc()));

		/*
		 * return catequizandoRepository.findByNomeStartingWithAndSituacao(nome,
		 * "N", sortByNomeAsc());
		 */
	}

	@RequestMapping(method = RequestMethod.POST)
	public @ResponseBody Integer add(@RequestBody Catequizando catequizando) {
		catequizandoRepository.save(catequizando);

		return 0;
	}

	@RequestMapping(value = "/remove/{idcatequizando}", method = RequestMethod.POST)
	public @ResponseBody Integer removeCatequizando(
			@PathVariable("idcatequizando") Integer idCatequizando) {

		Catequizando catequizando = catequizandoRepository
				.findOne(idCatequizando);
		catequizando.setSituacao("N");

		catequizandoRepository.save(catequizando);
		return 0;

	}

	@RequestMapping(value = "/removeturma/{idcatequizando}", method = RequestMethod.POST)
	public @ResponseBody Integer removeCatequizandoTurma(
			@PathVariable("idcatequizando") Integer idCatequizando) {

		Catequizando catequizando = catequizandoRepository
				.findOne(idCatequizando);
		catequizando.setIdTurmaAtual(null);

		catequizandoRepository.save(catequizando);

		return 0;
	}

	@RequestMapping(value = "/turma/{idturma}", method = RequestMethod.GET)
	public @ResponseBody Collection<Catequizando> getListaTurma(
			@PathVariable("idturma") Integer idTurma) {

		return Lists.newArrayList(catequizandoRepository.findByIdTurmaAtual(
				idTurma, sortByNomeAsc()));
	}

	private Sort sortByNomeAsc() {
		return new Sort(Sort.Direction.ASC, "nome");
	}

}
