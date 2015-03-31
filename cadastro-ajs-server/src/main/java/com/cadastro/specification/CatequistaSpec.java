package com.cadastro.specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import com.cadastro.model.Catequista;

public class CatequistaSpec {

    public static Specification<Catequista> login(final String login, final String passwd) {

	return new Specification<Catequista>() {

	    @Override
	    public Predicate toPredicate(Root<Catequista> root, CriteriaQuery<?> arg1, CriteriaBuilder builder) {
		// TODO Auto-generated method stub
		return builder.and(builder.equal(root.<String> get("login"), login),
			builder.equal(root.<String> get("senha"), passwd));
	    }
	};

    }

}
