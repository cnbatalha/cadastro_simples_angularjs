angular.module('cadastro', [ 'ngRoute', 'appControllers', 'catequeseServices', 'catequizandoModule' ])

.config(function($routeProvider) {

	$routeProvider

	/* login */
	.when('/', {
		title : "Login",
		templateUrl : 'templates/login/login.html',
		controller : 'navigation'
	}).when('/login', {
		templateUrl : 'templates/login/login.html',
		controller : 'navigation'
	}).when('/home', {
		templateUrl : 'home.html',
		controller : 'home'
	})

	/* catequizando */
	.when('/catequizandolist', {
		templateUrl : 'templates/catequizando/catequizandoList.html',
		controller : 'catequizandoController'
	}).when('/catequizando', {
		templateUrl : 'templates/catequizando/catequizando.html',
		controller : 'catequizandoController'
	}).when('/catequizando/:id', {
		templateUrl : 'templates/catequizando/catequizando.html',
		controller : 'catequizandoController'
	}).when('/aniversario', {
		templateUrl : 'templates/catequizando/aniversario.html',
		controller : 'aniversarioController'
	})

	/* catequista */
	.when('/catequista', {
		templateUrl : 'templates/catequista/catequistaList.html',
		controller : 'catequistaController'
	})

	/* turma */
	.when('/turmalist', {
		templateUrl : 'templates/turma/turmaList.html',
		controller : 'turmaController'
	}).when('/turma/:id', {
		templateUrl : 'templates/turma/turma.html',
		controller : 'turmaListaController'
	}).

	otherwise('/');

}).controller('home', function($scope, $http, webService) {

	$scope.box = function() {

		bootbox.alert("Mensagem alerta", function(result) {
		});

	}

}).controller('navigation', function($rootScope, $scope, $http, $location, webService) {

	$scope.auth = false;

	credentials = {};

	$scope.loginUser = function() {

		webService.login(credentials.username, credentials.password).then(function(value) {
			$scope.auth = value;
			if ($scope.auth) {
				$location.path('/home');
			} else {
				$location.path('/');
			}
		}, function(reason) {
			$location.path('/');
		}, function(value) {

		});

	}

	/*
	 * var authenticate = function(callback) {
	 * 
	 * $http.get('user').success(function(data) { if (data.name) {
	 * $rootScope.authenticated = true; } else { $rootScope.authenticated =
	 * false; } callback && callback(); }).error(function() {
	 * $rootScope.authenticated = false; callback && callback(); }); }
	 * 
	 * authenticate(); $scope.credentials = {}; $scope.login = function() {
	 * $http.post('login', $.param($scope.credentials), { headers : {
	 * "content-type" : "application/x-www-form-urlencoded" }
	 * }).success(function(data) { authenticate(function() { if
	 * ($rootScope.authenticated) { $location.path("/"); $scope.error = false; }
	 * else { $location.path("/login"); $scope.error = true; } });
	 * }).error(function(data) { $location.path("/login"); $scope.error = true;
	 * $rootScope.authenticated = false; }) };
	 */
});