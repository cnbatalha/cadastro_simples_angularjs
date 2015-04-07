'use strict';

// declare modules
// angular.module('Authentication', []);
// angular.module('Home', []);

angular.module(
		'cadastro',
		[ 'ngRoute', 'ngCookies', 'appControllers', 'catequeseServices', 'catequizandoModule', 'AuthController',
				'AuthService' ]).config(function($routeProvider) {

	$routeProvider

	/* login */
	.when('/', {
		title : "Login",
		templateUrl : 'templates/login/login.html',
		controller : 'LoginController'
	}).when('/login', {
		templateUrl : 'templates/login/login.html',
		controller : 'LoginController'
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

	$scope.credentials = {};

	$scope.loginUser = function() {

		webService.login($scope.credentials.username, $scope.credentials.password).then(function(value) {
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
}).run([ '$rootScope', '$location', '$cookieStore', '$http', function($rootScope, $location, $cookieStore, $http) {
	// keep user logged in after page refresh
	$rootScope.globals = $cookieStore.get('globals') || {};
	if ($rootScope.globals.currentUser) {
		$http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint
		// ignore:line
	}

	$rootScope.$on('$locationChangeStart', function(event, next, current) {
		// redirect to login page if not logged in
		if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
			$location.path('/login');
		}
	});
} ]).factory('authHttpResponseInterceptor', [ '$q', '$location', function($q, $location) {
	return {
		response : function(response) {
			if (response.status === 401) {
				console.log("Response 401");
			}
			return response || $q.when(response);
		},
		responseError : function(rejection) {
			if (rejection.status === 401) {
				console.log("Response Error 401", rejection);
				$location.path('/login').search('returnTo', $location.path());
			}
			return $q.reject(rejection);
		}
	}
} ]).config([ '$httpProvider', function($httpProvider) {
	// Http Intercpetor to check auth failures for xhr requests
	$httpProvider.interceptors.push('authHttpResponseInterceptor');
} ]);