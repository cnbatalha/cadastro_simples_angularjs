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
    xAxes.display = true;

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

  self.init = function(title) {

    var chart = {};
    chart.labels = [];
    chart.data = [];

    // options
    chart.options = {};
    // titulo
    chart.options.title = {};
    chart.options.title.display = false;
    if (title !== undefined){
      chart.options.title.text = title;
      chart.options.title.display = true;
      chart.options.title.fontSize = 16;
    }
    // legendas
    chart.options.legend = {};
    chart.options.legend.display = true;
    chart.series = [];

    chart.options.responsive = true;
    chart.options.showTooltips = true;
    chart.options.onAnimationComplete = function () {
        var ctx = this.chart.ctx;
       ctx.font = this.scale.font;
       ctx.fillStyle = this.scale.textColor
       ctx.textAlign = "center";
       ctx.textBaseline = "bottom";

       this.datasets.forEach(function (dataset) {
           dataset.bars.forEach(function (bar) {
               ctx.fillText(bar.value, bar.x, bar.y - 5);
           });
       })
    }

    return chart;
  }

  self.initBar = function()
  {

    var chart = self.init();
    chart.options = self.barOption();

    return chart;
  }

}
