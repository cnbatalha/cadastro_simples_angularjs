package com.cadastro.specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.persistence.metamodel.SingularAttribute;

import org.springframework.data.jpa.domain.Specification;

import com.cadastro.model.Catequizando;

public class CatequizandoSpec {

	public static volatile SingularAttribute<Catequizando, Integer> id;

	public static Specification<Catequizando> isNameLike(final String nome) {

		return new Specification<Catequizando>() {

			@Override
			public Predicate toPredicate(Root<Catequizando> root,
					CriteriaQuery<?> arg1, CriteriaBuilder builder) {
				// TODO Auto-generated method stub
				return builder.like(root.<String> get("nome"), nome);
			}
		};

	}
}
