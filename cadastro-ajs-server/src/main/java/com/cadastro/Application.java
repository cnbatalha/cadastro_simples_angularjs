package com.cadastro;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import com.cadastro.controller.DefaultController;
import com.cadastro.repository.CatequistaRepository;

@Configuration

@EnableWebMvc

@EnableJpaRepositories
@EnableTransactionManagement

@ComponentScan(basePackageClasses = {DefaultController.class, CatequistaRepository.class})
public class Application extends WebMvcConfigurerAdapter {

}
