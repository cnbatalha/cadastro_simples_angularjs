package com.cadastro.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import com.cadastro.model.Catequista;

@Repository
@Component
public interface CatequistaRepository extends CrudRepository<Catequista, Integer> {

}
