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

      $scope.titulo = 'Matéria';
      $scope.registro = {};
      var idRegistro = undefined;

      var getRegistros = function(){
        var catequizandosRef = firebase.database().ref('materias').orderByChild("nome")
                    .startAt($scope.inputSearch)
                    .endAt($scope.inputSearch + "\uf8ff")
                    .limitToFirst(10);


        catequizandosRef.once('value', function(data) {

          data.forEach(function(data) {
                // key will be "fred" the first time and "barney" the second time
            var key = data.key;
                // childData will be the actual contents of the child
            var childData = data.val();
            childData.key = key;

            lista.push(childData);
            $scope.$apply();

          });

        });

    }
      // adiciona catequista
      $scope.addRegistro = function() {


        // cria novo registro de turmas
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

  });
