'use strict';

/**
 * @ngdoc function
 * @name appEstudosApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the appEstudosApp
 */

var materiaModule = angular.module('materiaModule', []);

materiaModule.controller('materiaController', function($scope) {

      $scope.registro = {};
      $scope.registros = [];

      var idRegistro = undefined;

      $scope.atualizar = function()
      {
          $scope.registro.pesos = ($scope.registro.peso + $scope.registro.conhecimento
              + $scope.registro.tamanho + $scope.registro.dificuldade ) / 4;
      };

      // recuperar registros
      var getRegistros = function(){
        var materiaRef = firebase.database().ref('materias').orderByChild("nome")
                    .startAt($scope.inputSearch)
                    .endAt($scope.inputSearch + "\uf8ff")
                    .limitToFirst(10);

         materiaRef.on('value', function(data) {

          data.forEach(function(data) {
                // key will be "fred" the first time and "barney" the second time
            var key = data.key;
                // childData will be the actual contents of the child
            var childData = data.val();
            childData.key = key;

            $scope.registros.push(childData);
            //$scope.$apply();

          });

        });
     };

     getRegistros();

      // adiciona registro
      $scope.addRegistro = function() {


        // cria novo registro
        if ( idRegistro == undefined)
        {
          idRegistro  = firebase.database().ref("materias").push().getKey();
          $scope.registro.key = idRegistro ;
        }

        var updates = {};
        updates['/materias/' + idRegistro ] = $scope.registro;

        // atualiza turmas
        firebase.database().ref().update(updates);

      };

  })
.controller('flashCardController', function($scope, $http, $routeParams) {

  $scope.registro = {};

  var fetchRegistro = function(id) {

    // conexao firebase 
    var registroRef = firebase.database().ref('catequizandos/' + id).orderByValue();

    registroRef.on('value', function(data) {
      $scope.registro = data.val();
      $scope.$apply();
    });

  };

  fetchRegistro($routeParams.id);


});
