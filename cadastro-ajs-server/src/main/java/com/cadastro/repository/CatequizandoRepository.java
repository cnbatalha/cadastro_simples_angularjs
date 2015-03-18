package com.cadastro.repository;

import java.util.Collection;

import org.springframework.data.domain.Sort;
import org.springframework.data.repository.CrudRepository;

import com.cadastro.model.Catequizando;

public interface CatequizandoRepository extends
		CrudRepository<Catequizando, Integer> {

	public Collection<Catequizando> findByIdTurmaAtual(Integer idTurma,
			Sort sort);

	public Collection<Catequizando> findByNomeStartingWith(String nome,
			Sort sort);

	public Collection<Catequizando> findAll(Sort sort);

}
