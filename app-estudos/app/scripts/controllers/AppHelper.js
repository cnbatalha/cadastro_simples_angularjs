'use strict';

function AppHelper() {

  var self = this;

  // formatando minutos em hora
  this.getHrFormat = function( min ){

     return Math.floor( min/60 ) + 'h ' + Math.floor( min%60 ) + ' minutos';

  }

  // formanda data para yyyymmdd
  this.getDateFormated = function(d) {
      var date = new Date(d);
      var mm = date.getMonth() + 1; // getMonth() is zero-based
      var dd = date.getDate();

      return [date.getFullYear(),
              (mm>9 ? '' : '0') + mm,
              (dd>9 ? '' : '0') + dd
             ].join('');
  }
}
