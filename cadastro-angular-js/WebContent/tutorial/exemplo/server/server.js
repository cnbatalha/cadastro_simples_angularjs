/**
 * 
 */

function RestController($scope, $http) {

	$http.get('http://localhost:8085/cadastro-ajs-server/rest/info')
			.success(function(data, status, headers, config) {
				
				$scope.garcons = data;
				$scope.statusreq = 'sucesso';
				
			}).error(function(data, status, headers, config) {
				$scope.garcons = data;
				$scope.statusreq = headers;
				console.log(status || data);
			});
	
}