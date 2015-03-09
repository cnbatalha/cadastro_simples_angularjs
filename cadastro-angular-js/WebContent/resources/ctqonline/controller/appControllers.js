
var appControllers = angular.module('appControllers', []);

appControllers.controller('catequistaController', function($scope) {


});

appControllers.controller('catequizandoController', function($scope, $http) {
	
	$scope.catequizando = new Catequizando();
	
	$scope.registros = [];

	var fetchRegistros = function() {
		return $http.get('http://1-dot-platinum-pager-87217.appspot.com/catequizando').then(
				function(value) {
					$scope.registros = value.data;
				}, function(reason) {

				}, function(value) {

				});
	}

	fetchRegistros();

	$scope.addCatequizando = function() {
		var json = angular.toJson(this.catequizando);

		console.log(json);

		$http.post('http://1-dot-platinum-pager-87217.appspot.com/catequizando', json, {
			headers : {
				'Content-Type' : 'application/json; charset=UTF-8'
			}
		}).then(function(value) {
			this.catequizando = new Catequizando();

		}, function(reason) {
			console.log(reason);
		}, function(value) {
			console.log(value);
		})
	}

});

