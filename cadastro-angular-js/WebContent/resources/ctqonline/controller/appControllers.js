var appControllers = angular.module('appControllers', []);

appControllers.controller('catequistaController', function($scope) {

});

appControllers.controller('catequizandoController', function($scope, $http,
		$routeParams, webService) {

	var controller = this;

	var idCatequizando = $routeParams.id;
	$scope.catequizando = {};

	$scope.operacaoOK = false;
	$scope.operacaoErro = false;

	console.log(webService.turmas);
	$scope.turmas = webService.turmas;

	$scope.idTurma = {};
	$scope.turmaAtual = {};
	$scope.inputSearch = '';

	console.log(webService.turmas);

	var localizaTurma = function(idTurma) {
		$scope.turmaAtual = $.grep($scope.turmas, function(e, i) {
			return e.id == idTurma;
		});
		$scope.turmaAtual = $scope.turmaAtual[0];
		console.log($scope.turmaAtual);
	}

	$scope.registros = [];

	var fetchRegistros = function() {

		webService.getCatequizandoList().then(function(value) {
			$scope.registros = value;
		});
	}

	if (idCatequizando == undefined) {
		$scope.catequizando = new Catequizando();
		fetchRegistros();
	} else {
		webService.getCatequizando(idCatequizando).then(
				function(value) {
					$scope.catequizando = value;
					$scope.catequizando.nascimento = new Date(
							$scope.catequizando.nascimento);
					localizaTurma($scope.catequizando.idTurmaAtual);
				});
	}

	/*
	 * var fetchTurmas = function() {
	 * webService.getTurmaList().then(function(value) { $scope.turmas = value;
	 * }); }
	 * 
	 * //fetchTurmas();
	 */

	$scope.addCatequizando = function() {

		this.catequizando.idTurmaAtual = $scope.turmaAtual.id;

		webService.addCatequizando(this.catequizando).then(function(value) {
			console.log(value);
			$scope.operacaoOK = (value.status == 200);
			$scope.operacaoErro = !$scope.operacaoOK;
		}, function(reason) {

		}, function(value) {

		});
	}

	$scope.buscarRegistro = function() {

		webService.getCatequizandoNome(controller.inputSearch).then(
				function(value) {
					$scope.registros = value;
				}, function(reason) {

				}, function(value) {

				});
	}

	$scope.formatData = function(data) {
		dateFormat = new Date(data);
		return dateFormat.toLocaleDateString();
	}

});

appControllers.controller('turmaController',
		function($scope, $http, webService) {

			$scope.registros = [];

			var fetchRegistros = function() {

				webService.getTurmaList().then(function(value) {
					$scope.registros = value;
				});
			}

			fetchRegistros();

			$scope.formatData = function(data) {
				dateFormat = new Date(data);
				return dateFormat.toLocaleDateString();
			}

		});

appControllers.controller('turmaListaController', function($scope, $http,
		$routeParams, webService) {

	var controller = this;

	var idTurma = $routeParams.id;

	$scope.registros = [];

	var fetchRegistros = function() {
		console.log('chamou');
		webService.getTurmaCatequizandoList(idTurma).then(function(value) {
			$scope.registros = value;
		});
	}

	fetchRegistros();

	$scope.formatData = function(data) {
		dateFormat = new Date(data);
		return dateFormat.toLocaleDateString();
	}

});
