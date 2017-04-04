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
    registro.bimestres = {};
    registro.bimestres["bm1"] = {id:"bm1",nome:"BIMESTRE-1"};
    registro.bimestres["bm2"] = {id:"bm2",nome:"BIMESTRE-2"};
    registro.bimestres["bm3"] = {id:"bm3",nome:"BIMESTRE-3"};
    registro.bimestres["bm4"] = {id:"bm4",nome:"BIMESTRE-4"};

    $scope.registros = [];
    fbHelper.addRegistro('turmas/', registro, undefined);

    $scope.nomeTurma = "";
  }

});
