(function() {
  'use strict';

  angular
    .module('memoria')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('modelo', {
        url: '/modelo',
        params: { id: {} },
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main',
        title: 'Editar mensagem',
        status: 'edicao'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
