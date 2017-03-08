'use strict';

/**
 * @ngdoc overview
 * @name appEstudosApp
 * @description
 * # appEstudosApp
 *
 * Main module of the application.
 */
angular
  .module('appEstudosApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/materia', {
        templateUrl: 'views/materia/materia.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
