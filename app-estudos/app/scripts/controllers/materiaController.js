'use strict';

/**
 * @ngdoc function
 * @name appEstudosApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the appEstudosApp
 */

var materiaModule = angular.module('materiaModule', []);

materiaModule.controller('materiaController', function($scope, fbHelper) {

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

         var lista = [];

         materiaRef.on('value', function(data) {

          data.forEach(function(data) {
                // key will be "fred" the first time and "barney" the second time
            var key = data.key;
                // childData will be the actual contents of the child
            var childData = data.val();
            childData.key = key;

            lista.push(childData);
          });

          $scope.registros = lista;
          // $scope.$apply();

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
.controller('flashCardController', function($scope, $http, $routeParams, fbHelper) {

  $scope.registro = {};
  $scope.fCard = {};
  $scope.fCards = [];
  $scope.id = $routeParams.id;

  $scope.addFCard = function()
  {
    var url = "materias/" + $scope.id + "/flashcard/";

    fbHelper.addRegistro(url, $scope.fCard, undefined);

  };

  var updateRegistro = function(value)
  {
    $scope.registro = value;

    $scope.fCards = [];

    var x;
    for (x in $scope.registro.flashcard) {
        $scope.fCards.push($scope.registro.flashcard[x]);
    }

  };

  var fetchRegistro = function(id) {

    fbHelper.fetchRegistro('materias/' + id, updateRegistro);

  };

  fetchRegistro($routeParams.id);


})
.controller('jogoFCardController', function($scope, $http, $routeParams, fbHelper) {

  $scope.registro = {};
  $scope.fCard = {};
  $scope.id = $routeParams.id;

  var indexCard = 0;
  var cards =[];
  var pergunta = true;

  var carregarCard = function()
  {
    $scope.fCard = $scope.registro.flashcard[cards[indexCard]];
  }

  var updateRegistro = function(value)
  {
    $scope.registro = value;

    var x;
    for (x in $scope.registro.flashcard) {
        cards.push(x);
    }

    carregarCard();
  };

  var fetchRegistro = function(id) {

    fbHelper.fetchRegistro('materias/' + id, updateRegistro);

  };

  $scope.showPergunta = function()
  {
    return pergunta;
  };

  $scope.showResposta = function()
  {
    return !pergunta;
  };

  $scope.virarCard = function()
  {
    pergunta = !pergunta;
    return pergunta;
  };

  var calcularProximoCard = function()
  {
    return Math.floor((Math.random() * cards.length));
  };

  $scope.proximoCard = function()
  {
    pergunta = true;
    indexCard = calcularProximoCard();
    carregarCard();
  };

  var calcularAproveitamento = function()
  {
    if ( $scope.fCard.acertos == undefined)
    {
      $scope.fCard.acertos = 0;
    }

    if ( $scope.fCard.erros == undefined)
    {
      $scope.fCard.erros = 0;
    }

    if (($scope.fCard.acertos === 0) && ($scope.fCard.erros==0))
    {
      $scope.fCard.aproveitamento = 0;
    }
    else {
      var num = 100*$scope.fCard.acertos/($scope.fCard.acertos+$scope.fCard.erros);
      $scope.fCard.aproveitamento = num.toFixed(2);
    }

  }

  var updateFCard = function()
  {
    calcularAproveitamento();
    fbHelper.updateRegistro('materias/' + $scope.id + '/flashcard/', $scope.fCard.key, $scope.fCard);
  }

  // TOFIX : terá problema ao ser alterado ao mesmo tempo
  $scope.acerto = function()
  {
    if ( $scope.fCard.acertos == undefined)
    {
      $scope.fCard.acertos = 1;
    }
    else {
      $scope.fCard.acertos = $scope.fCard.acertos + 1;
    }

    updateFCard();
  };

  // TOFIX : terá problema ao ser alterado ao mesmo tempo
  $scope.erro = function()
  {

    if ( $scope.fCard.erros == undefined)
    {
      $scope.fCard.erros = 1;
    }
    else {
      $scope.fCard.erros = $scope.fCard.erros + 1;
    }

    updateFCard();
  };

  fetchRegistro($scope.id);

});
