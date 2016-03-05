var app = angular.module('dogs', []);

app.controller('dogsController', ['$scope', 'dogsService', function($scope, dogsService) {
	'use strict';

	$scope.sortType     = 'id';
	$scope.sortReverse  = false;
    dogsService.getDogs().then(function(data) {
		$scope.dogs = data;
	}).catch(function() {
		$scope.error = 'unable to get the dogs';
	});
	
}]);

app.service('dogsService', ['$http', function($http) {

	this.getDogs = function() {

		return $http.get('dogs.json').then(function(response) {
					return response.data;
			   });
	}
}]);
