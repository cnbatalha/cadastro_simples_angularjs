'use strict';

function ChartHelper() {

  var self = this;

	this.barOption = function()
  {
    // Configuracoes
    var xAxes = {};
    xAxes.ticks = {};
    xAxes.ticks.min = 1;
    xAxes.ticks.max = 100;
    xAxes.ticks.fixedStepSize = 10;

    var yAxes = {};
    yAxes.ticks = {};
    yAxes.ticks.beginAtZero = true;

    var options = {};
    options.scales = {};
    options.scales.xAxes = [];
    options.scales.xAxes.push(xAxes);
    options.scales.yAxes = [];
    options.scales.yAxes.push(yAxes);

    return options;
  };

  self.init = function() {

    var chart = {};
    chart.labels = [];
    chart.data = [];
    chart.options = {};
    chart.series = [];

    chart.options.responsive = true;

    return chart;
  }

  self.initBar = function()
  {

    var chart = self.init();
    chart.options = self.barOption();

    return chart;
  }

}
