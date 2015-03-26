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

	$scope.setPage = function(indexPage) {
		fetchRegistros(indexPage);
	}

	$scope.page = new Paginate($scope.setPage);

	// localiza turma
	var localizaTurma = function(idTurma) {
		$scope.turmaAtual = $.grep($scope.turmas, function(e, i) {
			return e.id == idTurma;
		});
		$scope.turmaAtual = $scope.turmaAtual[0];
		return $scope.turmaAtual;
	}

	$scope.registros = [];

	// carrega todos os registros usando paginacao
	var fetchRegistros = function(pageIndex) {

		webService.getCatequizandoList(pageIndex).then(function(value) {
			$scope.page.loadPage(value);
			$scope.registros = $scope.page.content;
		});
	}

	if (idCatequizando == undefined) {
		$scope.catequizando = new Catequizando();
		fetchRegistros(0);
	} else {
		webService.getCatequizando(idCatequizando).then(
				function(value) {
					$scope.catequizando = value;
					$scope.catequizando.nascimento = new Date(
							$scope.catequizando.nascimento);
					localizaTurma($scope.catequizando.idTurmaAtual);
				});
	}

	// adiciona catequizando
	$scope.addCatequizando = function() {

		this.catequizando.idTurmaAtual = $scope.turmaAtual.id;

		webService.addCatequizando(this.catequizando).then(function(value) {
			console.log(value);
			$scope.operacaoOK = (value.status == 200);
			$scope.operacaoErro = !$scope.operacaoOK;
			resetForm();
		}, function(reason) {

		}, function(value) {

		});
	}

	// busca registro de catequizandos por nome
	$scope.buscarRegistro = function(indexPage) {
		// caso nao seja informado valor campo para pesquisa retorna todos os
		// registros
		if ($scope.inputSearch.length == 0) {
			fetchRegistros();
		} else {
			webService.getCatequizandoNome($scope.inputSearch, indexPage).then(
					function(value) {
						$scope.page.loadPage(value)
						$scope.registros = $scope.page.content;
					}, function(reason) {

					}, function(value) {

					});
		}
	}

	$scope.formatData = function(data) {
		dateFormat = new Date(data);
		return dateFormat.toLocaleDateString();
	}

	$scope.getTurma = function(idTurma) {
		var loTurma = localizaTurma(idTurma);
		if (loTurma == undefined) {
			return '';
		} else {
			return loTurma.nome;
		}
	}

	// caixa para confirmar exclusao de catequizando
	$scope.removeCatequizando = function(idCatequizando) {

		bootbox.alert('Confirmar exclusão de Catequizando?', function() {
		});
	}

	// inicialia dados da tela
	var resetForm = function() {
		$scope.catequizando = new Catequizando();
		$scope.turmaAtual = {};
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

	$scope.turma = {};
	$scope.turmas = webService.turmas;
	$scope.total = 0;

	var localizaTurma = function(idTurma) {
		$scope.turma = $.grep($scope.turmas, function(e, i) {
			return e.id == idTurma;
		});

		$scope.turma = $scope.turma[0];
		console.log($scope.turma);
		return $scope.turma;
	}

	localizaTurma(idTurma);

	$scope.registros = [];

	var fetchRegistros = function() {
		webService.getTurmaCatequizandoList(idTurma).then(function(value) {
			$scope.registros = value;
			$scope.total = $scope.registros.length;
		});
	}

	fetchRegistros();

	$scope.formatData = function(data) {
		dateFormat = new Date(data);
		return dateFormat.toLocaleDateString();
	}

});
