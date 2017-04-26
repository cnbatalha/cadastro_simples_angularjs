'use strict';

var fbHelper = angular.module('FirebaseHelper', []);

fbHelper.service('fbHelper', function($http, $location, $rootScope) {

  var fb = this;

  fb.urls = [];

  // recuperar registros
  fb.getRegistros = function( url, order, updateLista, limit, key){

      if (limit == undefined){
        limit = 20;
      }

      if (order == undefined){
        var materiaRef = firebase.database().ref(url)
                  .limitToLast(limit);
      }
      else if (order === 'value'){
        var materiaRef = firebase.database().ref(url)
                  .limitToFirst(limit);
      }
      else {
        var materiaRef = firebase.database().ref(url).orderByChild(order)
                  .limitToLast(limit);
      }


      materiaRef.on('value', function(data) {

      var lista = [];

      data.forEach(function(data) {
            // key will be "fred" the first time and "barney" the second time
            var key = data.key;
            // childData will be the actual contents of the child
            var childData = data.val();
            childData.key = key;

            lista.push(childData);
            //$scope.$apply();
      });

      updateLista(lista, key);

    });
  };

  fb.fetchRegistro = function(url, updateRegistro ) {

    // conexao firebase
    var registroRef = firebase.database().ref(url).orderByValue();

    registroRef.on('value', function(data) {
      var registro = data.val();

      updateRegistro(registro);
    });

  };

  // adiciona registro
  fb.addRegistro = function(url, registro, idRegistro) {

    // cria novo registro
    if ( idRegistro == undefined)
    {
      idRegistro  = firebase.database().ref(url).push().getKey();
      registro.key = idRegistro ;
    }

    var updates = {};
    updates[url + idRegistro ] = registro;

    // atualiza turmas
    firebase.database().ref().update(updates);

  };

  // gera key
  fb.getKey = function(url)
  {
    return firebase.database().ref(url).push().getKey();
  }

  // atualizar registro
  fb.updateRegistro = function(url, idRegistro, registro) {

    var updates = {};
    updates[url + idRegistro ] = registro;

    // atualiza
    firebase.database().ref().update(updates);

  };

  // atualizar registro
  fb.updateRegistros = function(updates) {

    //var updates = {};
    //updates[url + idRegistro ] = registro;

    // atualiza
    firebase.database().ref().update(updates);

  };

});
