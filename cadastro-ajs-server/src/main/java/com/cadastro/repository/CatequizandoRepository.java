package com.cadastro.repository;

import java.util.Collection;

import org.springframework.data.repository.CrudRepository;

import com.cadastro.model.Catequizando;

public interface CatequizandoRepository extends
		CrudRepository<Catequizando, Integer> {

	public Collection<Catequizando> findByIdTurmaAtual(Integer idTurma);

	public Collection<Catequizando> findByNome(String nome);

}
