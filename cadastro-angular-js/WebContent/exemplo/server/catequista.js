/**
 * 
 */

function CatequistaController($scope, $http) {

	$http.get('http://localhost:12620/cadastro-ajs-server/catequista')
			.success(function(data, status, headers, config) {
				
				$scope.catequistas = data;
				$scope.statusreq = 'sucesso';
				
			}).error(function(data, status, headers, config) {
				$scope.catequistas = data;
				$scope.statusreq = headers;
				console.log(status || data);
			});
	
}