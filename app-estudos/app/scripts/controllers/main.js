'use strict';

/**
 * @ngdoc function
 * @name appEstudosApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the appEstudosApp
 */

 var mainModule = angular.module('mainModule', []);

mainModule.controller('mainController', function($scope, $http, $routeParams, fbHelper) {

    var url = 'horas/'
    var registros = {};

    $scope.chtBarras = {};

    var chartBarras = function(lista){

      $scope.chtBarras.labels = [];
      $scope.chtBarras.data = [];
      $scope.chtBarras.options = {};

      // Configuracoes
      var xAxes = {};
      xAxes.ticks = {};
      xAxes.ticks.min = 1;
      xAxes.ticks.max = 100;
      xAxes.ticks.fixedStepSize = 10;

      var yAxes = {};
      yAxes.ticks = {};
      yAxes.ticks.beginAtZero = true;

      $scope.chtBarras.options.scales = {};
      $scope.chtBarras.options.scales.xAxes = [];
      $scope.chtBarras.options.scales.xAxes.push(xAxes);
      $scope.chtBarras.options.scales.yAxes = [];
      $scope.chtBarras.options.scales.yAxes.push(yAxes);

      $scope.chtBarras.series = ["Acertos"];
      $scope.chtBarras.options.responsive = true;
      // $scope.chtBarras.colors = ['#46BFBD', '#FDB45C', '#DCDCDC'];

      for (var data in lista) {

        var total = 0;

        $scope.chtBarras.labels.push(lista[data].key);

        for (var apv in lista[data]) {

          if ( lista[data][apv].minutos !== undefined ) {
            total += lista[data][apv].minutos;
          }

        }

        // $scope.chtBarras.data.push(Math.round((total/60)*100)/100);
        $scope.chtBarras.data.push(total);
      }
    }

    var updateLista = function(lista)
    {
      registros = lista;

      chartBarras(registros);
    }

    fbHelper.getRegistros(url, 'nome', updateLista);

  });
