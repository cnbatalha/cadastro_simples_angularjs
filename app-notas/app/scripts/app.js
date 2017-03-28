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
    'ngSanitize',,
    'ngTouch',
    'FirebaseHelper',
    'notasModule',
    'turmaModule'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/turmas', {
        templateUrl: 'views/turma/turmas.html',
        controller: 'turmaController',
        controllerAs: 'notas'
      })
      .when('/notas', {
        templateUrl: 'views/notas/notas.html',
        controller: 'notasController',
        controllerAs: 'notas'
      })
      .when('/notas/:turmakey', {
        templateUrl: 'views/notas/notas.html',
        controller: 'notasController',
        controllerAs: 'notas'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run([ '$rootScope', '$location', '$cookieStore', '$http', function($rootScope, $location, $cookieStore, $http) {

    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyDZWd8odkKXhSm_LjZQDen4rv3zAChsQHs",
      authDomain: "app-notas-a0a3c.firebaseapp.com",
      databaseURL: "https://app-notas-a0a3c.firebaseio.com",
      storageBucket: "app-notas-a0a3c.appspot.com",
      messagingSenderId: "403634029022"
    };

    firebase.initializeApp(config);

  }]);
