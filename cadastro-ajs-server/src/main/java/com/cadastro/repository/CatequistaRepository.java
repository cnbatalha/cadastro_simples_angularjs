package com.cadastro.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.cadastro.model.Catequista;

public interface CatequistaRepository extends CrudRepository<Catequista, Integer> {

}
