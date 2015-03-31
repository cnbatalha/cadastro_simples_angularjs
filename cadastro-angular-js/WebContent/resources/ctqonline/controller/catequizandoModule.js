var catequizandoModule = angular.module('catequizandoModule', []);

catequizandoModule.controller('aniversarioController', function($scope, $http, $routeParams, webService) {

	$scope.registros = {};
	$scope.mes = '';

	$scope.turmas = webService.turmas;
	
	var fechRegistros = function() {
		webService.aniversarioCatequizando($scope.mes).then(function(value) {
			$scope.registros = value;
		}, function(reason) {

		}, function(value) {

		})
	}

	$scope.load = function() {
		fechRegistros();
	}
	
	
	$scope.formatData = function(data) {
		dateFormat = new Date(data);
		return dateFormat.toLocaleDateString();
	}
	

	// localiza turma
	var localizaTurma = function(idTurma) {
		$scope.turmaAtual = $.grep($scope.turmas, function(e, i) {
			return e.id == idTurma;
		});
		$scope.turmaAtual = $scope.turmaAtual[0];
		return $scope.turmaAtual;
	}
	
	$scope.getTurma = function(idTurma) {
		var loTurma = localizaTurma(idTurma);
		if (loTurma == undefined) {
			return '';
		} else {
			return loTurma.nome;
		}
	}

	
});
