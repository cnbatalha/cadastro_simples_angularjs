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

  var vm = this;

  // carregando turmaKey
  var turmaKey = $routeParams.turmakey;
  var url = "turmas/" + turmaKey + "/bimestres/";
  var urlAluno = "turmas/" + turmaKey + "/alunos/";
  var bimestre = "1";

  // notas o bimestre corrente
  var notasCorrente = {};

  $scope.chart = {};
  $scope.chtBarras = {};

  vm.registros = [];
  $scope.nomeAluno = "";

  var isUpdated = false;

  $scope.pvr1 = 0.0;

  function updateLista(lista)
  {
    if ( !isUpdated )
    {
      isUpdated = true;
      vm.registros = lista;
      // processarChar(vm.registros);
    }
  }

  function getRegistros()
  {
    return vm.registros;
  }


  fbHelper.getRegistros(url, 'nome', updateLista);

  $scope.atualizar = function(id, registro )
  {
    delete registro.$$hashKey;

    registro.final = (registro.p1 +  registro.l1 +
        registro.l2 + registro.p2)/2;

    fbHelper.addRegistro(url + id + '/notas/', registro, registro.key);
  }

  // adicionando aluno
  $scope.addNovo = function()
  {
    var registro = {};
    registro.nome = $scope.nomeAluno;
    registro.key = fbHelper.getKey(urlAluno);

    // adicionando na lista de alunos
    fbHelper.addRegistro(urlAluno, registro, registro.key);

    // adicionando no bimestre
    for (var bmt in getRegistros()) {
      fbHelper.addRegistro(url + getRegistros()[bmt].id + '/notas/', registro, registro.key);

      // adicionando na lista local
      getRegistros()[bmt].notas[registro.key] = registro;
    }

    processarChar(notasCorrente);

    $scope.nomeAluno = "";
  }

  $scope.processarChar = function(notas){

    chartPizza(notas);

    chartBarras(notas);

  }

  var chartPizza = function(notas){

    notasCorrente = notas;

    $scope.chart.labels = ["Aprovado", "Atenção", "Reprovado"];
    $scope.chart.data = [0, 0, 0];
    $scope.chart.options = {};
    $scope.chart.options.responsive = true;
    $scope.chart.colors = ['#46BFBD', '#FDB45C', '#DCDCDC'];

    // var notas =  dados["bm1"];

    for (var key in notas) {

      var ntFinal =  notas[key].final;
      if ( ntFinal >= 8 )
      {
        $scope.chart.data[0]++;
      }
      else if (( ntFinal >= 6 ) && ( ntFinal < 8 )) {
        $scope.chart.data[1]++;
      }
      else {
        $scope.chart.data[2]++;
      }

    }

  }

  var chartBarras = function(notas){

    $scope.chtBarras.labels = ["10", "9", "8", "7", "6"];
    $scope.chtBarras.data = [0, 0, 0, 0, 0 , 0, 0, 0, 0, 0, 0];
    $scope.chtBarras.options = {};
    $scope.chtBarras.options.responsive = true;
    $scope.chtBarras.colors = ['#46BFBD', '#FDB45C', '#DCDCDC'];

    // var notas =  dados["bm1"];

    for (var key in notas) {

      var ntFinal = Math.round(notas[key].final);
      $scope.chtBarras.data[ntFinal]++;

    }

    // $scope.$apply();

  }


});
