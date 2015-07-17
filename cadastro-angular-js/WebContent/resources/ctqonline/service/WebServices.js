var catequeseServices = angular.module('catequeseServices', []);

catequeseServices.service('webService', function($http, $location, $rootScope) {

	var service = this;
	var countRegister = 20;

	var port = '8080'; //$location.port();
	console.log($location);

	var host = $location.host();
	console.log(this.host);

	var protocol = $location.protocol();
	var serviceName = '/cadastro-ajs-server';

	/*if (host == 'localhost') {
		this.urlBase = protocol + '://192.168.0.101' + ':' + port + serviceName;
	} else {
		this.urlBase = 'http://sistematic.serveftp.net:8080' + serviceName;
	}*/

	this.urlBase = $rootScope.urlBase; // protocol + '://192.168.0.102' + ':' + port + serviceName;
	
	this.turmas = new Array();

	/* *************************************************************** */
	/* Catequizando */

	/* servico retorna o plano de Producao do Id informado */
	this.getCatequizandoList = function(pageIndex) {

		return $http.get(this.urlBase + '/catequizando/page/' + pageIndex + '/' + countRegister).then(function(value) {
			console.log(value.data);
			return value.data;
		}, function(reason) {
			console.log(reason);
		}, function(value) {

		});

	};

	this.getCatequizando = function(idCatequizando) {

		return $http.get(this.urlBase + '/catequizando/' + idCatequizando).then(function(value) {
			console.log(value.data);
			return value.data;
		}, function(reason) {
			console.log(reason);
		}, function(value) {

		});

	};

	this.removeCatequizando = function(idCatequizando) {

		return $http.post(this.urlBase + '/catequizando/remove/' + idCatequizando).then(function(value) {
			console.log(value.data);
			return value.data;
		}, function(reason) {
			console.log(reason);
		}, function(value) {

		});

	};

	this.getCatequizandoNome = function(nome, index) {

		return $http.get(this.urlBase + '/catequizando/nome/' + nome + '/page/' + index + '/' + countRegister).then(
				function(value) {
					console.log(value.data);
					return value.data;
				}, function(reason) {
					console.log(reason);
				}, function(value) {

				});

	};

	this.addCatequizando = function(Catequizando) {

		var json = angular.toJson(Catequizando);

		return $http.post(this.urlBase + '/catequizando', json, {
			headers : {
				'Content-Type' : 'application/json; charset=UTF-8'
			}
		}).then(function(value) {
			console.log('then ' + value);
			return value;
		}, function(reason) {
			console.log(reason);
			return reason;
		}, function(value) {
			console.log('value - ' + value);
		})

	}

	/* lista aniversariantes do Mes informado */
	this.aniversarioCatequizando = function(mes) {
		return $http.get(this.urlBase + '/catequizando/aniversario/' + mes).then(function(value) {
			console.log(value.data);
			return value.data;
		}, function(reason) {
			console.log(reason);
		}, function(value) {

		});

	}

	/* ************************************************************************ */
	/* turma */

	/* servico retorna turmas */
	this.getTurmaList = function() {

		return $http.get(this.urlBase + '/turma', {
			headers : {
				'Content-Type' : 'application/json; charset=UTF-8',
				'crossDomain': true
			}
		}).then(function(value) {
			console.log(value);
			return value.data;
		}, function(reason) {
			console.log(reason);
			return reason;
		}, function(value) {

		});

	};

	/* servico retorna turmas */
	this.getTurmaCatequizandoList = function(idTurma) {

		return $http.get(this.urlBase + '/catequizando/turma/' + idTurma).then(function(value) {
			console.log(value);
			return value.data;
		}, function(reason) {
			console.log(reason);
			return reason;
		}, function(value) {

		});

	};

	/* servico retorna turmas */
	this.getTurma = function(idTurna) {

		return $http.get(this.urlBase + '/turma/' + idTurna).then(function(value) {
			console.log(value.data);
			return value.data;
		}, function(reason) {
			console.log(reason);
		}, function(value) {

		});

	};

	/* Opeacoes */

	this.getTurmaList().then(function(value) {
		console.log('turmas carregadas');
		service.turmas = value;
		console.log(service.turmas);
	}, function(reason) {

	}, function(value) {

	});

	/* ********************************************************************** */
	/* Catequista */
	/* ********************************************************************** */

	/* login */
	this.login = function(login, passwd) {

		var hashLogin = "{login:" + login + " , passwd:" + passwd + "}";

		return $http.post(this.urlBase + '/catequista/login', hashLogin, {
			headers : {
				'Content-Type' : 'application/json; charset=UTF-8'
			}
		}).then(function(value) {
			console.log('then ' + value);
			return value;
		}, function(reason) {
			console.log(reason);
			return reason;
		}, function(value) {
			console.log('value - ' + value);
		});

	}

});