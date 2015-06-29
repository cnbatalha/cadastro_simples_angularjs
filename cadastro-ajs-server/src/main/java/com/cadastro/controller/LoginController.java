package com.cadastro.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cadastro.model.UserLogin;
import com.cadastro.model.Usuario;

import com.cadastro.repository.UsuarioRepository;
import com.cadastro.specification.UsuarioSpec;

@Controller
@RequestMapping("/login")
public class LoginController {

    @Autowired
    UsuarioRepository usuarioRepository;

    @RequestMapping(method = RequestMethod.POST)
    @ResponseBody
    public boolean login(@RequestBody UserLogin userLogin) {

	List<Usuario> list = usuarioRepository.findAll(UsuarioSpec.login(userLogin.getLogin(), userLogin.getPasswd()));

	return (list.size() > 0);
    }

    @RequestMapping(method = RequestMethod.GET)
    @ResponseBody
    public boolean login() {
	return true;
    }

    /*
     * @RequestMapping(method = RequestMethod.GET)
     * 
     * @ResponseBody public UserLogin teste() {
     * 
     * UserLogin userLogin = new UserLogin(); userLogin.setLogin("user");
     * userLogin.setLogin("user");
     * 
     * return userLogin; }
     */

}
