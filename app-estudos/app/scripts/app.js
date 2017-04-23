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
    'ngTouch',
    'materiaModule',
    'notasModule',
    'mainModule',
    'agendaModule',
    'FirebaseHelper',
    'chart.js'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'mainController',
        controllerAs: 'main'
      })
      .when('/materia', {
        templateUrl: 'views/materia/materia.html',
        controller: 'materiaController',
        controllerAs: 'materia'
      })
      .when('/flashcard/:id', {
        templateUrl: 'views/materia/flashCard.html',
        controller: 'flashCardController',
        controllerAs: 'fleshCard'
      })
      .when('/jogofcard/:id', {
        templateUrl: 'views/materia/jogoFCard.html',
        controller: 'jogoFCardController',
        controllerAs: 'jogoFCard'
      })
      .when('/materias', {
        templateUrl: 'views/materia/materia.html',
        controller: 'materiaViewController',
        controllerAs: 'notas'
      })
      .when('/agenda', {
        templateUrl: 'views/materia/agenda.html',
        controller: 'agendaController',
        controllerAs: 'notas'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run([ '$rootScope', '$location', '$cookieStore', '$http', function($rootScope, $location, $cookieStore, $http) {

    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyBelWXYlwcvlSsPiRUjVq28J-cDNmhLs5A",
      authDomain: "app-estudos.firebaseapp.com",
      databaseURL: "https://app-estudos.firebaseio.com",
      storageBucket: "app-estudos.appspot.com",
      messagingSenderId: "21739883932"
    };

    firebase.initializeApp(config);

  }]);
