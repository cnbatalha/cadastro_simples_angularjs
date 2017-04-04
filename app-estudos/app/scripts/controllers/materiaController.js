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

  $scope.chtBarras = {};

  // aproveitamento
  $scope.aprv = {};
  // horas de estudos
  $scope.hr = {};

  $scope.id = $routeParams.id;

  $scope.addFCard = function()  {

    var url = "materias/" + $scope.id + "/flashcard/";

    fbHelper.addRegistro(url, $scope.fCard, undefined);

  };

  $scope.chartBarras = function(lista){

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
      var acertos = 0;

      $scope.chtBarras.labels.push(data);

      for (var apv in lista[data]) {

        total += lista[data][apv].total;
        acertos += lista[data][apv].acertos;
        //$scope.chtBarras.data.push(
        //    Math.round( (lista[data][apv].acertos/lista[data][apv].total)*100 )
        //   );
      }

      $scope.chtBarras.data.push(Math.round( (acertos/total)*100 ));
    }

    // $scope.$apply();
  }

  var updateRegistro = function(value)  {

    $scope.registro = value;

    $scope.fCards = [];

    var x;
    for (x in $scope.registro.flashcard) {
        $scope.fCards.push($scope.registro.flashcard[x]);
    }

    // chartBarras(value.aproveitamento);

  };

  var fetchRegistro = function(id) {

    fbHelper.fetchRegistro('materias/' + id, updateRegistro);

  };

  fetchRegistro($routeParams.id);

  $scope.registrarAproveitamento = function() {
    var date = new Date();
    var dateFormated = getDateFormated(date);

    var url = "materias/" + $scope.id + "/aproveitamento/" + dateFormated + "/";
    fbHelper.addRegistro(url, $scope.aprv, undefined);

  }

  var getDateFormated = function(date) {
    var mm = date.getMonth() + 1; // getMonth() is zero-based
    var dd = date.getDate();

    return [date.getFullYear(),
            (mm>9 ? '' : '0') + mm,
            (dd>9 ? '' : '0') + dd
           ].join('');
  }

  $scope.registrarHrEstudo = function()
  {
    var date = new Date();
    var dateFormated = getDateFormated(date);

    $scope.hr.date = date;

    var url = "materias/" + $scope.id + "/horas/" + dateFormated + "/";
    fbHelper.addRegistro(url, $scope.hr, undefined);

    $scope.hr.materia = $scope.registro.nome;
    $scope.hr.materiakey = $scope.registro.key;

    var urlHOras = "horas/" + dateFormated + "/";
    fbHelper.addRegistro(urlHOras, $scope.hr, undefined);

    $scope.hr = {};
  }


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
