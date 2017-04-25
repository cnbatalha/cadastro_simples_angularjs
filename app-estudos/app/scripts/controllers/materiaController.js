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
                    .limitToFirst(20);

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
.controller('materiaViewController', function($scope, $http, $routeParams, fbHelper) {

  // id materia
  $scope.id = $routeParams.id;


})
.controller('flashCardController', function($scope, $http, $routeParams, fbHelper) {

  // id materia
  $scope.id = $routeParams.id;

  $scope.orderList = 'nome';
  $scope.registro = {};

  //  query grid
  $scope.query = "";
  $scope.showGrid = false;

  // flash cards
  $scope.fCard = {};
  $scope.fCards = [];

  // topicos
  $scope.topico = {};
  $scope.topicoList = [];
  $scope.topicosSelecionados = [];
  $scope.topicosSelecionadosHr = [];
  var urlTopicos = 'topicos/' + $scope.id + '/';

  // evento selecionar topico
  $scope.selecionarTopico = function(t){
    t.acertos = 0;
    t.erros = 0;
    $scope.topicosSelecionados.push(t);
  }
  // event para selecionar topico hora
  $scope.selecionarTopicoHr = function(t){
    t.hr = 0;
    $scope.topicosSelecionadosHr.push(t);
  }

  $scope.ativarGrid = function(value){
    $scope.showGrid = ( value !== "" );
  }

  // grafico
  $scope.chtBarras = new ChartHelper().initBar();

  // aproveitamento
  $scope.aprv = {};
  // horas de estudos
  $scope.hr = {};

  // add flashcard
  $scope.addFCard = function()  {
    var url = "materias/" + $scope.id + "/flashcard/";
    fbHelper.addRegistro(url, $scope.fCard, undefined);
  };

  // gerando grafico de barras
  $scope.chartBarras = function(lista){

    $scope.chtBarras.labels = [];
    $scope.chtBarras.data = [];

    $scope.chtBarras.series = ["Acertos"];

    for (var data in lista) {
      var total = 0;
      var acertos = 0;

      $scope.chtBarras.labels.push(data);

      for (var apv in lista[data]) {
        total += lista[data][apv].total;
        acertos += lista[data][apv].acertos;
      }

      $scope.chtBarras.data.push(Math.round( (acertos/total)*100 ));
    }

    // $scope.$apply();
  }

  // atualiza registros
  var updateRegistro = function(value)  {
    $scope.registro = value;
    $scope.fCards = [];

    var x;
    for (x in $scope.registro.flashcard) {
        $scope.fCards.push($scope.registro.flashcard[x]);
    }

    // chartBarras(value.aproveitamento);
  };

  // carregando materia
  var fetchRegistro = function(id) {
    fbHelper.fetchRegistro('materias/' + id, updateRegistro);
  };
  fetchRegistro($routeParams.id);

  // registra aproveitamento
  $scope.registrarAproveitamento = function() {
    var date = new Date();
    var dateFormated = getDateFormated(date);

    var url = "materias/" + $scope.id + "/aproveitamento/" + dateFormated + "/";
    fbHelper.addRegistro(url, $scope.aprv, undefined);

    var urlAprov = "aproveitamento/" + dateFormated + "/" + $scope.id + "/" ;

    var updates = {};

    // adicionando aproveitamento por topico
    for (var tpc in $scope.topicosSelecionados) {

        var urlTpcs = urlAprov + $scope.topicosSelecionados[tpc].key + "/" ;
        var regTpcs = $scope.topicosSelecionados[tpc];

        regTpcs.key = fbHelper.getKey(urlTpcs);
        regTpcs.acertos = $scope.aprv.acertos;
        regTpcs.erros = $scope.aprv.erros;
        regTpcs.total = $scope.aprv.total;
        delete regTpcs.$$hashKey;

        updates[urlTpcs + regTpcs.key] = regTpcs;
        //fbHelper.addRegistro(urlTpcs, regTpcs , undefined);
    }

    fbHelper.updateRegistros(updates);
  }

  var getDateFormated = function(date) {
    var mm = date.getMonth() + 1; // getMonth() is zero-based
    var dd = date.getDate();

    return [date.getFullYear(),
            (mm>9 ? '' : '0') + mm,
            (dd>9 ? '' : '0') + dd
           ].join('');
  }

  // registrar periodo de estudo
  $scope.registrarHrEstudo = function()  {
    var date = new Date();
    var dateFormated = getDateFormated($scope.hr.data);

    $scope.hr.date = date;

    var url = "materias/" + $scope.id + "/horas/" + dateFormated + "/";
    fbHelper.addRegistro(url, $scope.hr, undefined);

    $scope.hr.materia = $scope.registro.nome;
    $scope.hr.materiakey = $scope.registro.key;

    var urlHOras = "horas/" + dateFormated + "/";
    fbHelper.addRegistro(urlHOras, $scope.hr, undefined);

    for (var tp in $scope.topicosSelecionadosHr ) {
        var tpc = $scope.topicosSelecionadosHr[tp];
        if (tpc.horas == undefined){
          tpc.horas = 0;
        }
        tpc.horas += tpc.hr;
        var urlTpc = 'topicos/' + $scope.id + '/';
        delete tpc.$$hashKey;

        fbHelper.updateRegistro(urlTpc, tpc.key, tpc);
    }

    $scope.hr = {};
  }

  // totalizando aproveitamento
  $scope.totalizarAproveitamento = function(){
    $scope.aprv.total = $scope.aprv.erros + $scope.aprv.acertos;
  }

  // atualiza lista de topicos
  var updateListaTopicos = function(lista){
    $scope.topicoList = [];

    for (var l in lista) {
      $scope.topicoList.push(lista[l]);
    }

  }

  // fbHelper.addRegistro(urlTopicos, $scope.hr, 10);
  var fetchTopicos = function() {
    fbHelper.fetchRegistro(urlTopicos, updateListaTopicos);
  };

  // carregar topicos
  fetchTopicos();

  // registra topico
  $scope.registrarTopico = function() {
    fbHelper.addRegistro(urlTopicos, $scope.topico, undefined);
  }

})
.controller('jogoFCardController', function($scope, $http, $routeParams, fbHelper) {

  $scope.registro = {};
  $scope.fCard = {};
  $scope.id = $routeParams.id;

  var fCardApr = {};
  var indexCard = 0;
  var cards =[];
  var pergunta = true;

  var carregarCard = function(){
    $scope.fCard = $scope.registro.flashcard[cards[indexCard]];
  }

  var updateRegistro = function(value){
    $scope.registro = value;

    var x;
    for (x in $scope.registro.flashcard) {
        cards.push(x);
    }

    carregarCard();
  };

  var updateFCardApr = function(value){
    fCardApr = value;
  }

  var fetchRegistro = function(id) {
    fbHelper.fetchRegistro('materias/' + id, updateRegistro);
    fbHelper.fetchRegistro('flashcard/' + id, updateFCardApr);
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

    //var fc = {};
    //var urlFcard = 'flashcard/' + $scope.id ;
    //fc.key = fbHelper.getKey(urlFcard);
    //fbHelper.updateRegistro(urlFcard, fc.key, fc);
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

})
.controller('revisaoController', function($scope, $http, $routeParams, fbHelper) {

  var nomeMateria = $routeParams.nome;
  var idMateria = $routeParams.id;

  $scope.id = $routeParams.id;
  $scope.registro = {};
  $scope.registro.rvs = [];
  $scope.registros = {};

  $scope.rv = {};

  var urlRevisao = 'revisao/'+ $scope.id + '/' ;


  var getDateFormated = function(d) {
    var date = new Date(d);
    var mm = date.getMonth() + 1; // getMonth() is zero-based
    var dd = date.getDate();

    return [date.getFullYear(),
            (mm>9 ? '' : '0') + mm,
            (dd>9 ? '' : '0') + dd
           ].join('');
  }

  $scope.registrarRevisao = function(){

      for (var rv in $scope.registro.rvs) {
          delete $scope.registro.rvs[rv].$$hashKey;
      }

      fbHelper.addRegistro(urlRevisao, $scope.registro, undefined);

      for (var rv in $scope.registro.rvs) {
        var agendaItem = $scope.registro.rvs[rv];
        agendaItem.materia = nomeMateria;
        agendaItem.materiaKey = idMateria;

        var urlAgenda = 'agenda/' + getDateFormated($scope.registro.rvs[rv].data) + '/';

        fbHelper.addRegistro(urlAgenda, agendaItem, undefined);
      }

  }

  var updateRegistros = function(lista){
    $scope.registros = lista;

    $scope.$apply();
  }

  fbHelper.fetchRegistro(urlRevisao, updateRegistros);

  $scope.addPadrao = function(){

    var today = new Date();
    var rvPadrao = {};
    rvPadrao.data = new Date(today);
    rvPadrao.tipo = '24h';
    rvPadrao.status = 'N'
    $scope.registro.rvs.push(rvPadrao);

    rvPadrao = {};
    rvPadrao.data = new Date(today);
    rvPadrao.data.setDate(today.getDate() + 7);
    rvPadrao.tipo = '7 Dias';
    rvPadrao.status = 'N'
    $scope.registro.rvs.push(rvPadrao);

    rvPadrao = {};
    rvPadrao.data = new Date(today);
    rvPadrao.data.setDate(today.getDate() + 30);
    rvPadrao.tipo = '30 Dias';
    rvPadrao.status = 'N'
    $scope.registro.rvs.push(rvPadrao);

    rvPadrao = {};
    rvPadrao.data = new Date(today);
    rvPadrao.data.setDate(today.getDate() + 60);
    rvPadrao.tipo = '60 Dias';
    rvPadrao.status = 'N'
    $scope.registro.rvs.push(rvPadrao);

  }

  $scope.removerData = function(value){

    var index = $scope.registro.rvs.valueOf(value);
    $scope.registro.rvs.splice(index, 1);

  }

  $scope.addData =  function(){
    $scope.registro.rvs.push($scope.rv);
  }


});
