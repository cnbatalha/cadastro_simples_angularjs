'use strict';

/**
 * @ngdoc function
 * @name appNotas.controller:notasController
 * @description
 * # MainCtrl
 * Controller of the appEstudosApp
 */

var notasModule = angular.module('notasModule', []);

notasModule.controller('notasController', function($scope,  $routeParams, fbHelper) {

  // carregando turmaKey
  var turmaKey = $routeParams.turmakey;
  var url = "turmas/" + turmaKey + "/alunos/";
  var bimestre = "1";

  $scope.registros = [];
  $scope.nomeAluno = "";

  var updateLista = function(lista)
  {
    $scope.registros = lista;
  }

  $scope.getRegistros = function()
  {
    return $scope.registros;
  }

  fbHelper.getRegistros(url, 'nome', updateLista);

  $scope.atualizar = function( registro )
  {
    delete registro.$$hashKey;
    registro.final = (registro.p1 +  registro.l1 + registro.l2 + registro.p2)/2;

    fbHelper.addRegistro(url, registro, registro.key);
  }

  $scope.addNovo = function()
  {
    var registro = {};
    registro.nome = $scope.nomeAluno;

    fbHelper.addRegistro(url, registro, undefined);

    $scope.nomeAluno = "";
  }

});
