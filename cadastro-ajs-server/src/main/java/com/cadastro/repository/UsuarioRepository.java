package com.cadastro.repository;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.cadastro.model.Usuario;

public interface UsuarioRepository extends PagingAndSortingRepository<Usuario, Integer>,
	JpaSpecificationExecutor<Usuario> {

}
