package com.cadastro;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import com.cadastro.controller.DefaultController;

@Configuration
@ComponentScan(basePackageClasses = DefaultController.class)
@EnableWebMvc
public class Application extends WebMvcConfigurerAdapter {

}
