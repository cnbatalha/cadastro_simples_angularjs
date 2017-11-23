(function() {
  'use strict';

  angular
    .module('memoria')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, $scope, webDevTec, $stateParams, toastr, UtilsService) {
    var vm = this;

    //$scope.navbarCollapsed = true;

    vm.awesomeThings = [];
    vm.classAnimation = '';
    vm.creationDate = 1509222873569;
    vm.showToastr = showToastr;

    vm.itens = [];
    vm.list = [];

    function copyItem( lista ){
      angular.forEach(lista, function(item) {
        var gpItem = {};
        gpItem.list = item.list;
        gpItem.tipo = item.tipo;
        gpItem.nome = item.nome;
        vm.list.push(gpItem);
      });
    }

    if ($stateParams.id == undefined) {
      copyItem(UtilsService.getProcessoPMBOK());
    } else if ($stateParams.id == 1) {
      copyItem(UtilsService.getProcessoITILV3());
    } else if ($stateParams.id == 2) {
      copyItem(UtilsService.getProcessoCOBIT());
    } else if ($stateParams.id == 3) {
      copyItem(UtilsService.getProcessoMPSBR());
    } else if ($stateParams.id == 4) {
      copyItem(UtilsService.getProcessoCMMIDEV());
    }


    vm.list2 = [ {"nome":"X"}];

    // lista de grupos
    vm.grupos = [];


    // itens selecionados
    vm.selecteds = [];
    vm.doubleClick = doubleClick;
    vm.clickGrupo = clickGrupo;
    vm.removeItem = removeItem;

    // remover item da lista
    function removeItem(item, gp){
      var index = gp.list.indexOf(item);
      if (index > -1) {
          gp.list.splice(index, 1);
          item.selected = false;
          vm.itens.push(item);
      }
    }

    // muda grupo selecionados
    function clickGrupo(pg){
      if (vm.selecteds.length > 0){
        angular.forEach(vm.selecteds, function(item) {
          pg.list.unshift(item);
          var index = vm.itens.indexOf(item);
          if (index > -1) {
              vm.itens.splice(index, 1);
          }
        });
        vm.selecteds = [];
      }
    }

    // evento doubleClick
    function doubleClick(item){
      if (item.selected){
        var index = vm.selecteds.indexOf(item);
        if (index > -1) {
            vm.selecteds.splice(index, 1);
        }
        item.selected = false;
      }
      else {
        item.selected = true;
        vm.selecteds.push(item);
      }
    }

    // agrupa os items em lista única
    function agrupar(list){

      angular.forEach(list, function(gp) {
        angular.forEach(gp.list, function(item) {
          item.selected = false;
          vm.itens.push(item);
        });
        vm.itens.sort();
        gp.list = [];
        gp.list.push({});
        vm.grupos.push(gp);
      });


    }

    agrupar(vm.list);

    activate();

    function activate() {
      getWebDevTec();
      $timeout(function() {
        vm.classAnimation = 'rubberBand';
      }, 4000);
    }

    function showToastr() {
      toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
      vm.classAnimation = '';
    }

    function getWebDevTec() {
      vm.awesomeThings = webDevTec.getTec();

      angular.forEach(vm.awesomeThings, function(awesomeThing) {
        awesomeThing.rank = Math.random();
      });
    }
  }
})();
