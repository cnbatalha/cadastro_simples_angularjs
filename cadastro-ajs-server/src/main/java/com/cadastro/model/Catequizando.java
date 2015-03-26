package com.cadastro.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "catequizando")
public class Catequizando {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;

	private String nome;
	private Date nascimento;
	private String nomePai;
	private String nomeMae;
	private boolean batizado;
	private boolean eucaristia;
	private String escola;
	private String serieEscola;
	private String sexo;
	private String endereco;
	private String observacao;

	@Column(name = "tel_fixo")
	private String telCelular;

	@Column(name = "tel_celular")
	private String telFixo;

	@Column(name = "id_turma_atual")
	private Integer idTurmaAtual;
	
	@JsonIgnore
	@Column(name = "situacao_deletado")
	private String situacao = "N";

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getTelCelular() {
		return telCelular;
	}

	public void setTelCelular(String telCelular) {
		this.telCelular = telCelular;
	}

	public String getTelFixo() {
		return telFixo;
	}

	public void setTelFixo(String telFixo) {
		this.telFixo = telFixo;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public Date getNascimento() {
		return nascimento;
	}

	public void setNascimento(Date nascimento) {
		this.nascimento = nascimento;
	}

	public String getNomePai() {
		return nomePai;
	}

	public void setNomePai(String nomePai) {
		this.nomePai = nomePai;
	}

	public String getNomeMae() {
		return nomeMae;
	}

	public void setNomeMae(String nomeMae) {
		this.nomeMae = nomeMae;
	}

	public boolean isBatizado() {
		return batizado;
	}

	public void setBatizado(boolean batizado) {
		this.batizado = batizado;
	}

	public boolean isEucaristia() {
		return eucaristia;
	}

	public void setEucaristia(boolean eucaristia) {
		this.eucaristia = eucaristia;
	}

	public String getEscola() {
		return escola;
	}

	public void setEscola(String escola) {
		this.escola = escola;
	}

	public String getSerieEscola() {
		return serieEscola;
	}

	public void setSerieEscola(String serieEscola) {
		this.serieEscola = serieEscola;
	}

	public String getEndereco() {
		return endereco;
	}

	public void setEndereco(String endereco) {
		this.endereco = endereco;
	}

	public String getSexo() {
		return sexo;
	}

	public void setSexo(String sexo) {
		this.sexo = sexo;
	}

	public String getObservacao() {
		return observacao;
	}

	public void setObservacao(String observacao) {
		this.observacao = observacao;
	}

	public Integer getIdTurmaAtual() {
		return idTurmaAtual;
	}

	public void setIdTurmaAtual(Integer idTurmaAtual) {
		this.idTurmaAtual = idTurmaAtual;
	}

	public String getSituacao() {
		return situacao;
	}

	public void setSituacao(String situacao) {
		this.situacao = situacao;
	}

}
