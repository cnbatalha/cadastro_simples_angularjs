/**
 * 
 */

var app = angular.module('myApp', [ 'ngResource' ]);

app.factory("Garcom", function($resource) {
	return $resource("http://192.168.0.86:8080/siscommanda.server-0.1/garcom")
});

app.controller("garcomControllerAPI", function($scope, Garcom) {
	$scope.statusreq = "controller";
	
	Garcom.query(function(data) {
		$scope.garcons = data;
	});
});