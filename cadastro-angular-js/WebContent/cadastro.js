angular
		.module('cadastro',
				[ 'ngRoute', 'appControllers', 'catequeseServices' ])

		.config(function($routeProvider) {

			$routeProvider.when('/', {
				templateUrl : 'home.html',
				controller : 'home'
			}).when('/login', {
				templateUrl : 'login.html',
				controller : 'navigation'
			})

			.when('/catequizandolist', {
				templateUrl : 'templates/catequizando/catequizandoList.html',
				controller : 'catequizandoController'
			}).when('/catequizando', {
				templateUrl : 'templates/catequizando/catequizando.html',
				controller : 'catequizandoController'
			}).when('/catequizando/:id', {
				templateUrl : 'templates/catequizando/catequizando.html',
				controller : 'catequizandoController'
			})

			.when('/catequista', {
				templateUrl : 'templates/catequista/catequistaList.html',
				controller : 'catequistaController'
			}).

			when('/turmalist', {
				templateUrl : 'templates/turma/turmaList.html',
				controller : 'turmaController'
			}).when('/turma/:id', {
				templateUrl : 'templates/turma/turma.html',
				controller : 'turmaListaController'
			}).

			otherwise('/');

		}).controller('home', function($scope, $http, webService) {
			/*
			 * $http.get('/resource/').success(function(data) { $scope.greeting =
			 * data; });
			 */
		}).controller('navigation',
				function($rootScope, $scope, $http, $location) {

					/*
					 * var authenticate = function(callback) {
					 * 
					 * $http.get('user').success(function(data) { if (data.name) {
					 * $rootScope.authenticated = true; } else {
					 * $rootScope.authenticated = false; } callback &&
					 * callback(); }).error(function() {
					 * $rootScope.authenticated = false; callback && callback();
					 * }); }
					 * 
					 * authenticate(); $scope.credentials = {}; $scope.login =
					 * function() { $http.post('login',
					 * $.param($scope.credentials), { headers : { "content-type" :
					 * "application/x-www-form-urlencoded" }
					 * }).success(function(data) { authenticate(function() { if
					 * ($rootScope.authenticated) { $location.path("/");
					 * $scope.error = false; } else { $location.path("/login");
					 * $scope.error = true; } }); }).error(function(data) {
					 * $location.path("/login"); $scope.error = true;
					 * $rootScope.authenticated = false; }) };
					 */
				});