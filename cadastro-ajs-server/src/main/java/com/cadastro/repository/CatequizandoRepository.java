package com.cadastro.repository;

import java.util.Collection;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.cadastro.model.Catequizando;

public interface CatequizandoRepository extends
		PagingAndSortingRepository<Catequizando, Integer>,
		JpaSpecificationExecutor<Catequizando> {

	public Collection<Catequizando> findByIdTurmaAtual(Integer idTurma,
			Sort sort);

	/*public Page<Catequizando> findByNomeStartingWithAndSituacao(String nome,
			String situacao);*/

	public Collection<Catequizando> findBySituacao(String situacao, Sort sort);
}
