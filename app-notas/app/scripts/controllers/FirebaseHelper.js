'use strict';

var fbHelper = angular.module('FirebaseHelper', []);

fbHelper.service('fbHelper', function($http, $location, $rootScope) {

  var fb = this;

  fb.urls = [];

  // recuperar registros
  fb.getRegistros = function( url, order, updateLista){

      var materiaRef = firebase.database().ref(url).orderByChild(order)
                //.startAt($scope.inputSearch)
                //.endAt($scope.inputSearch + "\uf8ff")
                .limitToFirst(20);

      materiaRef.on('value', function(data) {

      var lista = [];

      data.forEach(function(data) {
            // key will be "fred" the first time and "barney" the second time
            var key = data.key;
            // childData will be the actual contents of the child
            var childData = data.val();
            if ( childData.key === undefined)
            {
              childData.key = key;
            }

            lista.push(childData);
            //$scope.$apply();
            //updateLista(childData);
      });

      updateLista(lista);

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

    // registro = angular.toJson(registro);

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

});
