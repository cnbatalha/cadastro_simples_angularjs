var catequeseServices = angular.module('catequeseServices', []);

catequeseServices.service('webService', function($http, $location) {

	var service = this;

	var port = $location.port();
	console.log($location);

	var host = $location.host();
	console.log(this.host);

	var protocol = $location.protocol();

	this.urlBase = protocol + '://' + host + ':' + port;

	this.turmas = new Array();

	/* servico retorna o plano de Producao do Id informado */
	this.getCatequizandoList = function() {

		return $http.get(this.urlBase + '/cadastro-ajs-server/catequizando')
				.then(function(value) {
					console.log(value.data);
					return value.data;
				}, function(reason) {
					console.log(reason);
				}, function(value) {

				});

	};

	this.getCatequizando = function(idCatequizando) {

		return $http.get(
				this.urlBase + '/cadastro-ajs-server/catequizando/'
						+ idCatequizando).then(function(value) {
			console.log(value.data);
			return value.data;
		}, function(reason) {
			console.log(reason);
		}, function(value) {

		});

	};

	this.addCatequizando = function(Catequizando) {

		var json = angular.toJson(Catequizando);

		return $http.post(this.urlBase + '/cadastro-ajs-server/catequizando',
				json, {
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

	/* servico retorna turmas */
	this.getTurmaList = function() {

		return $http.get(this.urlBase + '/cadastro-ajs-server/turma').then(
				function(value) {
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

		return $http.get(
				this.urlBase + '/cadastro-ajs-server/catequizando/turma/'
						+ idTurma).then(function(value) {
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

		return $http
				.get(this.urlBase + '/cadastro-ajs-server/turma/' + idTurna)
				.then(function(value) {
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

});