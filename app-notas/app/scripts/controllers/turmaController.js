'use strict';

/**
 * @ngdoc function
 * @name appNotas.controller:notasController
 * @description
 * # MainCtrl
 * Controller of the appEstudosApp
 */

var turmaModule = angular.module('turmaModule', []);

turmaModule.controller('turmaController', function($scope, fbHelper) {

  $scope.nomeTurma = "";
  $scope.registros = [];

  var updateLista = function(lista)
  {
    $scope.registros = lista;
  }

  fbHelper.getRegistros('turmas/', 'nome', updateLista);

  $scope.addNovo = function()
  {
    var registro = {};
    registro.nome = $scope.nomeTurma;

    $scope.registros = [];
    fbHelper.addRegistro('turmas/', registro, undefined);

    $scope.nomeTurma = "";
  }

});
