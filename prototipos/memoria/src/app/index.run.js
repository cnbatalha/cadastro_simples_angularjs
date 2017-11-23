(function() {
  'use strict';

  angular
    .module('memoria')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
