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

    var vm = this;

    var url = 'horas/'
    var urlAgenda = 'agenda/'

    var registros = {};
    var listaBarras = [];
    var listaSemana = [];
    var totalSemana = 0;
    var listaAprv = {};

    $scope.chtBarras = {};
    $scope.chtPizza = {};
    $scope.chtSemana = new ChartHelper().init();
    $scope.chtAproveitamento = new ChartHelper().initBar();

    $scope.agendamento = {};

    vm.chtPzData = {};
    $scope.chtPzLabel = {};

    // carregando agendamentos
    var updateAgendamento = function(lista){

      $scope.agendamento = [];
      for (var dia in lista) {
          for (var agn in lista[dia]) {
            if ( lista[dia][agn].data !== undefined){
              $scope.agendamento.push(lista[dia][agn]);
            }
          }
      }

    }

    fbHelper.getRegistros(urlAgenda, 'value', updateAgendamento, 10);

    var updateListaAproveitamento = function(lista, key){

      for (var vr in lista) {
          // console.log(lista[vr]);
          for (var ap in lista[vr]) {
            if (lista[vr][ap].acertos !== undefined){
              listaAprv[key].acertos += lista[vr][ap].acertos;
              listaAprv[key].total += lista[vr][ap].total;
            }
          }
      }

      chartAproveitamento();
      $scope.$apply();
    }

    var processaChartAproveitamento = function(idMateria, materia){
      var urlAproveitamento = 'materias/' + idMateria + '/aproveitamento/';

      if (listaAprv[idMateria] == undefined){
       listaAprv[idMateria] = {}
       listaAprv[idMateria].acertos = 0;
       listaAprv[idMateria].total = 0;
       listaAprv[idMateria].percentual = 0;
       listaAprv[idMateria].materia = materia;
      }

      fbHelper.getRegistros(urlAproveitamento, undefined, updateListaAproveitamento, 7, idMateria);
    }

    var chartAproveitamento = function()
    {
      $scope.chtAproveitamento.labels = [];
      $scope.chtAproveitamento.data = [];

      for (var data in listaAprv) {
        $scope.chtAproveitamento.labels.push(listaAprv[data].materia);
        var perc =  Math.round( (listaAprv[data].acertos/listaAprv[data].total)*100);
        $scope.chtAproveitamento .data.push(perc);
      }
    }

    // processa chart Semanal
    var processaChartSemanal = function(materia, minutos)
    {
      if ( listaSemana[materia] == undefined){
        listaSemana[materia] = {};
        listaSemana[materia].total = 0;
        listaSemana[materia].materia = materia;
      }

      listaSemana[materia].total += minutos;
      totalSemana += minutos;
    }

    // gera gráfico Semanal
    var chartSemana = function(){

      for (var data in listaSemana) {
        $scope.chtSemana.labels.push(data);
        var perc =  Math.round( (listaSemana[data].total/totalSemana)*100);
        $scope.chtSemana.data.push(perc);
      }

    }

    // gerar grafico de barras
    var chartBarras = function(lista){

      // criando objeto de inicializacao
      var chartHelper = new ChartHelper();
      $scope.chtBarras = chartHelper.initBar();

      var totais = []
      for (var data in lista) {

        // adicionando label
        $scope.chtBarras.labels.push(lista[data].key);
        var total = 0;
        listaBarras[lista[data].key] = [];

        for (var apv in lista[data]) {

          var sessao = {};
          if ( lista[data][apv].minutos !== undefined ) {
            total += lista[data][apv].minutos;
            // adicionando sessao
            sessao.minutos = lista[data][apv].minutos;
            sessao.materia = lista[data][apv].materia;
            listaBarras[lista[data].key].push(sessao);
            // chart semanal
            processaChartSemanal(lista[data][apv].materia, lista[data][apv].minutos);
            //
            processaChartAproveitamento(lista[data][apv].materiakey, lista[data][apv].materia);
          }
        }

        totais.push(total);
      }

      $scope.chtBarras.data = totais;

      // atualiza chart
      // $scope.$apply();
    }

    // gera grafico diario
    var chartPizza = function(lista){

      // criando objeto de inicializacao
      $scope.chtPizza = new ChartHelper().initBar();

      for (var data in lista) {

        var total = 0;
        var totais = [];

        $scope.chtPizza.labels.push(lista[data].key);

        for (var apv in lista[data]) {

          if ( lista[data][apv].minutos !== undefined ) {
            total += lista[data][apv].minutos;
            //totais.push(lista[data][apv].minutos);
          }

        }
        // $scope.chtBarras.data.push(Math.round((total/60)*100)/100);
        // totais.push(total);
        $scope.chtPizza.data.push(total);
      }

      //vm.chtPzData = totais;
    }

    // atualizando lista
    var updateLista = function(lista)
    {
      registros = lista;

      chartBarras(registros);
      chartSemana();
      //chartPizza(registros);
      chartAproveitamento();

      $scope.$apply();
    }

    // carregando lista de aproveitamento
    fbHelper.getRegistros(url, 'nome', updateLista, 7);

    // evento ao clicar nas barras
    $scope.onClickBarras = function(points, evt){
        console.log(points, evt);

        var lb = points[0]._model.label;
        // var lista = registros;
        vm.chtPzData = [];
        $scope.chtPzLabel = [];
        // var totais = [];

        for (var apv in listaBarras[lb] ) {

          if ( listaBarras[lb][apv].minutos !== undefined ) {
            $scope.chtPizza.labels.push(listaBarras[lb][apv].materia);
            $scope.chtPizza.data.push(listaBarras[lb][apv].minutos);
          }

        }

        $scope.$apply();
    }

    //$scope.$on('chart-create', function (evt, chart) {
    //  console.log(chart);
    //});

  });
