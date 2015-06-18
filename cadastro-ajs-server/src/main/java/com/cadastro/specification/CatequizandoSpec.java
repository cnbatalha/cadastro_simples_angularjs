package com.cadastro.specification;

import java.util.Calendar;
import java.util.Date;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Expression;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.persistence.metamodel.SingularAttribute;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;

import com.cadastro.model.Catequizando;

public class CatequizandoSpec {

    // query by like name
    public static Specification<Catequizando> isNameLike(final String nome) {

	return new Specification<Catequizando>() {

	    @Override
	    public Predicate toPredicate(Root<Catequizando> root, CriteriaQuery<?> arg1, CriteriaBuilder builder) {
		// TODO Auto-generated method stub
		return builder.like(root.<String> get("nome"), nome);
	    }
	};

    }

    // query by active register,using field situacao
    public static Specification<Catequizando> isAtivo() {

	return new Specification<Catequizando>() {

	    @Override
	    public Predicate toPredicate(Root<Catequizando> root, CriteriaQuery<?> arg1, CriteriaBuilder builder) {
		// TODO Auto-generated method stub
		return builder.like(root.<String> get("situacao"), "N");
	    }
	};

    }

    // query by birthday
    public static Specification<Catequizando> isAniversario(final Integer mes) {

	return new Specification<Catequizando>() {

	    @Override
	    public Predicate toPredicate(Root<Catequizando> root, CriteriaQuery<?> arg1, CriteriaBuilder builder) {
		// TODO Auto-generated method stub
		Path<Date> birthdate = root.get("nascimento");
		Expression<Integer> mesAniversario = builder.function("month", Integer.class, birthdate);

		return builder.and(builder.equal(mesAniversario, mes), builder.isNotNull(birthdate));
		
	    }
	};

    }
    
    private Sort sortByNomeAsc() {
	return new Sort(Sort.Direction.ASC, "nome");
    }
    
}
