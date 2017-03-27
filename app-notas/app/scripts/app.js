'use strict';

/**
 * @ngdoc overview
 * @name appNotasApp
 * @description
 * # appNotasApp
 *
 * Main module of the application.
 */
angular
  .module('appNotasApp', [
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
      .otherwise({
        redirectTo: '/'
      });
  });
