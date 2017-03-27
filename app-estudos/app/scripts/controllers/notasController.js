'use strict';

/**
 * @ngdoc function
 * @name appNotas.controller:notasController
 * @description
 * # MainCtrl
 * Controller of the appEstudosApp
 */

var notasModule = angular.module('notasModule', []);

notasModule.controller('notasController', function($scope, fbHelper) {


  $scope.registros = [];

  var aluno = {};
  aluno.nome = "carlos";

  $scope.registros.push(aluno);

  // adiciona registro
  var addRegistro = function( registro, idRegistro ) {

    delete registro.$$hashKey;

    // cria novo registro
    if ( idRegistro == undefined)
    {
      idRegistro  = firebase.database().ref("notas").push().getKey();
      registro.key = idRegistro ;
    }

    var updates = {};
    updates["/notas/" + idRegistro ] = registro;

    // atualiza turmas
    firebase.database().ref().update(updates);

  };


  $scope.atualizar = function( registro )
  {
    registro.final = registro.p1 + registro.p2;
    registro.key = undefined;

    addRegistro(registro);
    // fbHelper.addRegistro('notas/', registro, undefined);
  }


});
